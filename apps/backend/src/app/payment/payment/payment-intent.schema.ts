import { Coupon } from '@backend/app/coupon/coupon.schema';
import { User } from '@backend/app/user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PaymentIntentDocument = PaymentIntent & Document;
@Schema({ timestamps: true })
export class PaymentIntent {
  @Prop()
  orderId: string;

  @Prop()
  amount: string;

  @Prop()
  currency: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon: Coupon;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  payee: User;

  @Prop({ type: Object })
  data: any;

  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ type: 'Number', default: 0.0 })
  commission: number;

  @Prop({ default: 'not_started' })
  refundStatus: string;

  @Prop({ default: false })
  isRefunded: boolean;

  @Prop({ nullable: true })
  refundFailReason: string;

  @Prop({ type: Object, nullable: true })
  metadata;
}

export const PaymentIntentSchema = SchemaFactory.createForClass(PaymentIntent);
