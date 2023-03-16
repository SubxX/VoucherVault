import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, FilterQuery } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly baseModel: Model<UserDocument>
  ) {}

  async createUser(payload: CreateUserDto) {
    return this.baseModel.create(payload);
  }

  async updateUser(id: string, payload: CreateUserDto) {
    return this.baseModel.findByIdAndUpdate(id, payload);
  }

  async getByEmail(email: string) {
    return this.baseModel.findOne({ email: email });
  }

  async getById(id: string) {
    return this.baseModel.findOne({ id: id });
  }

  async getUser(
    filter: FilterQuery<UserDocument> = {},
    projection?: ProjectionType<UserDocument>
  ) {
    return this.baseModel.findOne(filter, projection);
  }
}
