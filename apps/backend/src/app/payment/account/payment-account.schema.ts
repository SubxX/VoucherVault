import { User } from '@backend/app/user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PaymentIntent } from '../payment/payment-intent.schema';

export type PaymentAccountDocument = PaymentAccount & Document;
@Schema({ timestamps: true })
export class PaymentAccount {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Object, nullable: true })
  linkedAccount: any;

  @Prop({ type: Object, nullable: true })
  stakeHolder: any;

  @Prop({ type: Object, nullable: true })
  productConfiguration: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentIntent',
    nullable: true,
  })
  payments: [PaymentIntent];

  @Prop({ type: Object, nullable: true })
  metadata;
}

export const PaymentAccountSchema =
  SchemaFactory.createForClass(PaymentAccount);
