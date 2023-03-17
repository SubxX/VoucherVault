import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDocument } from './brand.schema';
import { CreateBrandReq } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('brand') private readonly baseModel: Model<BrandDocument>
  ) { }

  async create(body?: CreateBrandReq) {
    const createdBrand = await this.baseModel.create(body);
    return createdBrand;
  }

  async update(id: string, updateBrand) {
    const updatedBrand = await this.baseModel.findByIdAndUpdate(
      id,
      updateBrand
    );
    return updatedBrand;
  }

  async delete(id: string) {
    const deletedEntry = await this.baseModel.findByIdAndDelete(id);
    return deletedEntry;
  }

  async findById(id: string) {
    const brand = await this.baseModel.findById(id);
    console.log("brand", brand)
    return brand;
  }

  async findAll(query) {
    return await this.baseModel.find(query);
  }

  async findOne(query) {
    const brand = await this.baseModel.findOne(query);
    return brand;
  }
}
