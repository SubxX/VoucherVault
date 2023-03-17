import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../brand/brand.module';
import { BrandSchema } from '../brand/brand.schema';
import { CategoryModule } from '../categories/category.module';
import { CategorySchema } from '../categories/category.schema';
import { MediaModule } from '../media/media.module';
import { MediaSchema } from '../media/media.schema';
import { NotificationModule } from '../notification/notification.module';
import { UsersModule } from '../user/user.module';
import { UserSchema } from '../user/user.schema';
import { CouponController } from './coupon.controller';
import { CouponSchema } from './coupon.schema';
import { CouponService } from './coupon.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coupon', schema: CouponSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Media', schema: MediaSchema },
      { name: 'Brand', schema: BrandSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
    UsersModule,
    MediaModule,
    NotificationModule,
    BrandModule,
    CategoryModule,
  ],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
