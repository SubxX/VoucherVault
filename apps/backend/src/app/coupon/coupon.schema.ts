import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Brand } from '../brand/brand.schema';
import { Category } from '../categories/category.schema';
import { Media } from '../media/media.schema';
import { User } from '../user/user.schema';

export type CouponDocument = Coupon & Document;
@Schema({ timestamps: true })
export class Coupon {
  @Prop({
    unique: true,
    select: false,
  })
  code: string;

  @Prop({ nullable: true, nmae: 'valid_upto' })
  validUpto: Date;

  @Prop({
    type: String,
    enum: ['PERCENT', 'AMOUNT'],
    default: 'PERCENT',
  })
  type: string;

  @Prop()
  value: number;

  @Prop({ nullable: true })
  title: string;

  @Prop({ nullable: true })
  description: string;

  @Prop({
    type: Number,
    default: 0,
    name: 'commision_percent',
    min: [0, 'Commision percent cannot be less than 0'],
    max: [100, 'Commision percent cannot be greater than 100'],
  })
  commisionPercent: boolean;

  @Prop({ type: Number, default: 0, name: 'commision_amount' })
  bidAmount: string;

  @Prop({ type: Boolean, default: false, name: 'is_verified' })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false, name: 'is_available' })
  isAvailable: boolean;

  @Prop({ nullable: true })
  link: string;

  @Prop({ nullable: true, default: 'INR' })
  currency: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Media' })
  medias: [Media];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  categories: [Category];

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
