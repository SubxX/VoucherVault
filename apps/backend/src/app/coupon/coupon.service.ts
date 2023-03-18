import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from './coupon.schema';
import { Media, MediaDocument } from '../media/media.schema';
import { MediaService } from '../media/media.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../categories/category.service';
import { Category, CategoryDocument } from '../categories/category.schema';
import { Brand, BrandDocument } from '../brand/brand.schema';
import moment from 'moment';
import { User, UserDocument } from '../user/user.schema';
import { TriggerNotificationBody } from '../notification/notification.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private baseModel: Model<CouponDocument>,
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    private readonly mediaService: MediaService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    await this.couponAlreadyExist(createCouponDto.code);

    const brand: any = await this.brandService.findById(createCouponDto?.brand);
    createCouponDto.brand = brand;

    let categories;
    if (createCouponDto.categories) {
      categories = await this.getCategoryDetails(createCouponDto.categories);
      createCouponDto.categories = categories;
    }

    console.log('createCouponDto', createCouponDto);
    const createdCoupon = await this.baseModel.create(createCouponDto);

    if (createCouponDto.categories) {
      for (const category of categories) {
        await this.categoryModel.findByIdAndUpdate(
          category._id,
          { $push: { coupons: createdCoupon } },
          { new: true }
        );
      }
    }

    if (createCouponDto?.brand) {
      await this.brandModel.findByIdAndUpdate(
        brand._id,
        { $push: { coupons: createdCoupon } },
        { new: true }
      );
    }

    if (createCouponDto.createdBy)
      await this.userModel.findByIdAndUpdate(
        createCouponDto.createdBy,
        { $push: { coupons: createdCoupon } },
        { new: true }
      );

    const user = await this.userModel.findById(createCouponDto.createdBy);
    const templatebody: TriggerNotificationBody = {
      templateName: 'coupon-created',
      subscriberId: user.email,
      email: user.email,
      payload: {
        couponCode: createdCoupon.code,
        couponCommission: createdCoupon.bidAmount,
        couponDescription: createdCoupon.description,
        currency: createdCoupon.currency,
      },
    };

    console.log('templateBody', templatebody);
    await this.notificationService.trigger(templatebody);
    return createdCoupon;
  }

  async getCategoryDetails(categories) {
    const categoriesDet = [];
    for (const category of categories) {
      const categoryExists = await this.categoryService.findById(category);
      categoriesDet.push(categoryExists._id);
    }
    return categoriesDet;
  }

  async couponAlreadyExist(couponCode: string) {
    const couponExists = await this.findOne({
      code: couponCode,
    });
    return couponExists;
  }

  async update(id, update) {
    const couponExists = await this.findOneWitCode({ code: update?.code });
    if (couponExists?.code !== update?.code && couponExists)
      throw new HttpException(
        'Coupon Code Already Exists',
        HttpStatus.BAD_REQUEST
      );

    let brand;
    if (update.brand) {
      brand = await this.brandService.findById(update.brand);
    }
    update.brand = brand?._id;

    //update categories
    let categories;
    if (update.categories) {
      categories = await this.getCategoryDetails(update.categories);
      update.categories = categories;
    }

    const coupon = await this.findById(id);
    await this.baseModel.findByIdAndUpdate(coupon._id, update, { new: true });

    return await this.findById(id);
  }

  async updateAvialbility(id, update) {
    await this.baseModel.findByIdAndUpdate(id, update);

    return await this.findById(id);
  }

  async search(query?) {
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '200');
    const sort = query.sort || '-createdAt';
    let categories, brands;
    console.log('query', query, sort);

    if (query?.category) {
      categories = await this.categoryModel.find(
        { name: { $in: query.search } },
        { id: true }
      );
    }
    if (query?.brand) {
      brands = await this.brandModel.find(
        { name: { $in: query.search } },
        { id: true }
      );
    }
    const options = {
      $or: [
        // { categories: { $in: categories } },
        // { brand: { $in: brands } },
        { title: new RegExp(query.search.toString(), 'i') },
        { description: new RegExp(query.search.toString(), 'i') },
      ],
    };

    console.log('options', options.$or);
    const coupon = await this.baseModel
      .find(options)
      .populate(
        'createdBy brand categories medias'
        // {
        //   path: 'createdBy categories brand',
        // }
      )
      .limit(size)
      .skip(page * size)
      .sort(sort);
    return coupon;
  }

  async find(query?) {
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '200');
    const sort = query.sort || '-createdAt';
    let options, categories, brands;
    console.log('query', query, sort);

    if (query.search) {
      options.$or = [
        { title: new RegExp(query.search.toString(), 'i') },
        { description: new RegExp(query.search.toString(), 'i') },
      ];
    } else {
      if (query?.category) {
        categories = await this.categoryModel.find(
          { _id: { $in: query.category } },
          { id: true }
        );
      }
      if (query?.brand) {
        brands = await this.brandModel.find(
          { _id: { $in: query.brand } },
          { id: true }
        );
      }

      options = {
        isAvailable: true,
        validUpto: { $gte: new Date() },
        ...(query.category && { categories: { $in: categories } }),
        ...(query.brand && { brand: { $in: brands } }),
        ...(query.title && { title: new RegExp(query.title.toString(), 'i') }),
        ...(query.description && {
          description: new RegExp(query.description.toString(), 'i'),
        }),
      };
    }

    console.log('options', options);
    const coupon = await this.baseModel
      .find(options)
      .populate('createdBy brand categories medias')
      .limit(size)
      .skip(page * size)
      .sort(sort);
    return coupon;
  }

  async findMyCoupons(query?) {
    const sort = query.sort || '-createdAt';
    const coupon = await this.baseModel
      .find(query)
      .select('+code')
      .populate('createdBy brand categories medias')
      .sort(sort);
    return coupon;
  }

  async findOne(query?) {
    const coupon = await await this.baseModel
      .findOne(query)
      .populate('createdBy brand categories medias');
    return coupon;
  }

  async findOneWitCode(query?) {
    const coupon = await await this.baseModel
      .findOne(query)
      .select('+code')
      .populate('createdBy brand categories medias');
    return coupon;
  }

  async findById(id) {
    const coupon = await this.baseModel
      .findById(id)
      .populate('createdBy brand categories medias');
    return coupon;
  }

  async findByCouponCode(code) {
    const coupon = await this.baseModel
      .findOne({ code })
      .populate('createdBy brand categories medias');

    return coupon;
  }

  async revealCouponCode(id) {
    const coupon = await this.baseModel
      .findById(id)
      .select('+code')
      .populate('createdBy brand categories medias');

    return coupon;
  }

  async deleteCoupon(id) {
    const coupon = await this.baseModel.findById(id);
    if (!coupon)
      throw new HttpException(`Coupon Not found`, HttpStatus.NOT_FOUND);

    await this.baseModel.findByIdAndDelete(id);
    return 'Coupon Deleted Successfully';
  }
}
