import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Coupon } from '../coupon/coupon.schema';
import { Media } from '../media/media.schema';

export type BrandDocument = Brand & Document;
@Schema({ timestamps: true })
export class Brand {
  @Prop({ lowercase: true, required: [true, 'Brand Name is required'] })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Media' })
  media: Media;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }])
  coupons: [Coupon];

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
