import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from './category.schema';
import { CreateCategoryReq } from './dto/categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly baseModel: Model<CategoryDocument>
  ) { }

  async create(body?: CreateCategoryReq) {
    const createdCategory = await this.baseModel.create(body);
    return createdCategory;
  }

  async update(id: string, updateCategory) {
    const updatedCategory = await this.baseModel.findByIdAndUpdate(
      id,
      updateCategory
    );
    return updatedCategory;
  }

  async delete(id: string) {
    const deletedEntry = await this.baseModel.findByIdAndDelete(id);
    return deletedEntry;
  }

  async findById(id: string) {
    const category = await this.baseModel.findById(id);
    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    return category;
  }

  async findAll(query) {
    const cat = await this.baseModel.find(query);
    return cat;
  }

  async findOne(query) {
    const category = await this.baseModel.findOne(query);
    return category;
  }
}
