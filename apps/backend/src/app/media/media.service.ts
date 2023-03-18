import { Injectable } from '@nestjs/common';
import { CreateMediaReq, CreateMediaWithLinkReq } from './media.dto';
import { CloudinaryService } from './clodinary.service';
import { Model } from 'mongoose';
import { MediaDocument } from './media.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel('media') private readonly baseModel: Model<MediaDocument>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async uploadImage(file, media: CreateMediaReq) {
    const nameArr = file.originalname.split('.');
    const name = nameArr.splice(0, nameArr.length - 1).join('');

    const typeArr = file.mimetype.split('/');
    media.name = name;
    media.ext = typeArr[1];
    media.mime = file.mimetype;
    media.size = file.size;
    media.altText = media.altText || name;
    media.public = true;
    media.provider = 'cloudinary';
    media.type = typeArr[0];
    const cloudinaryMedia = await this.cloudinaryService.uploadImage(
      file,
      media.user
    );

    media.url = cloudinaryMedia.url;
    media.providerMetadata = cloudinaryMedia;
    const createdMedia = await this.baseModel.create(media);
    return createdMedia;
  }

  async createMediaWithLink(body: CreateMediaWithLinkReq) {
    const media = new CreateMediaReq();
    media.name = body?.name || 'image';
    media.size = body?.size || 1;
    media.mime = body?.mime || 'image/jpeg';
    media.type = body?.type || 'image';
    media.user = body?.user;
    media.public = body?.public || true;
    media.url = body?.url || null;
    media.provider = body?.provider || 'external';
    media.providerMetadata = body?.providerMetadata;
    media.altText = body?.altText || 'image';
    const createdMedia = this.baseModel.create(media);
    return createdMedia;
  }

  async update(id: string, updateMedia) {
    const updatedMedia = await this.baseModel.findByIdAndUpdate(
      id,
      updateMedia,
      { new: true }
    );
    return updatedMedia;
  }

  async delete(id: string) {
    const media = await this.baseModel.findById(id);
    await this.cloudinaryService.deleteImage(
      media?.providerMetadata?.public_id
    );
    const deletedEntry = await this.baseModel.findByIdAndDelete(id);
    return deletedEntry;
  }

  async findById(id: string) {
    return await this.baseModel.findById(id);
  }

  async findByUrl(url: string) {
    return await this.baseModel.findOne({ url });
  }
}
