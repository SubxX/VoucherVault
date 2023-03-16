import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = Category & Document;
@Schema({ timestamps: true })
export class Category {
  @Prop({ required: [true, 'Category Name is required'], lowercase: true })
  name: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
