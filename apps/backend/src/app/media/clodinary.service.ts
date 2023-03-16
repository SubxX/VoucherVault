import { HttpException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file,
    userId
  ): Promise<UploadApiResponse | UploadApiErrorResponse | any> {
    const folder = userId || 'public';
    const nameArr = file.originalname.split('.');
    const name = nameArr.splice(0, nameArr.length - 1).join('');

    const ext = nameArr[nameArr.length - 1];
    const fileName = name + '_' + Math.floor(Date.now() / 1000) + '.' + ext;
    const filePath = folder + '/' + fileName;
    console.log('filePath', filePath);

    try {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        toStream(file.buffer).pipe(upload, {
          folder: filePath,
        });
      });
    } catch (err) {
      console.log('Media upload error', err);
      throw new HttpException('Media upload error', 500);
    }
  }

  async deleteImage(publicId) {
    return v2.uploader.destroy(publicId);
  }
}
