import { cloudinaryConfigs } from '../../common/cloudinary.config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): void => {
    return v2.config({
      cloud_name: cloudinaryConfigs.cloudName,
      api_key: cloudinaryConfigs.apiKey,
      api_secret: cloudinaryConfigs.apiSecret,
    });
  },
};
