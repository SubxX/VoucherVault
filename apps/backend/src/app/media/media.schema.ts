import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';

export type MediaDocument = Media & Document;
@Schema({ timestamps: true })
export class Media {
  @Prop()
  name: string;

  @Prop({ nullable: true })
  url: string;

  @Prop()
  size: number;

  @Prop()
  mime: string;

  @Prop()
  type: string;

  @Prop()
  public: boolean;

  @Prop()
  altText: string;

  @Prop({ nullable: true })
  ext: string;

  @Prop({ nullable: true })
  provider: string;

  @Prop({ type: Object, nullable: true, name: 'provider_metadata' })
  providerMetadata;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
