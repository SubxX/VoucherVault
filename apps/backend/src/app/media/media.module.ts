import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../user/user.module';
import { CloudinaryService } from './clodinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { MediaController } from './media.controller';
import { MediaSchema } from './media.schema';
import { MediaService } from './media.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'media', schema: MediaSchema }]),
    UsersModule,
  ],
  providers: [CloudinaryProvider, MediaService, CloudinaryService],
  controllers: [MediaController],
  exports: [CloudinaryProvider, MediaService],
})
export class MediaModule {}
