import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  ref: string;

  @Prop({ name: 'first_name' })
  firstName: string;

  @Prop({ nullable: true, name: 'middle_name' })
  middleName?: string;

  @Prop({ name: 'last_name' })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ nullable: true })
  mobile: string;

  @Prop({ nullable: true, name: 'date_of_birth' })
  dateOfBirth?: Date;

  @Prop({ nullable: true })
  password: string;

  @Prop({ nullable: true, name: 'country_code' })
  countryCode: string;

  @Prop({ nullable: true, name: 'currency_code' })
  currencyCode: string;

  @Prop({ nullable: true, name: 'referred_by' })
  referredBy: string;

  @Prop({ nullable: true, name: 'referralCode' })
  referralCode: string;

  @Prop({ nullable: true })
  role: string;

  @Prop({ type: Object, nullable: true })
  adDetails?: any;

  @Prop({
    type: Object,
  })
  metadata: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
