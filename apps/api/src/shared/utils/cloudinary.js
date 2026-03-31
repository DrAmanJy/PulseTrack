import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../config/env.js';
import fs from 'fs';
import { logger } from '../logger/logger.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

export const uploadImgToCloudinary = async (localFile) => {
  if (!localFile) return null;

  try {
    const response = await cloudinary.uploader.upload(localFile, {
      folder: 'profile_images',
      resource_type: 'image',
      allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    });

    return response;
  } catch (err) {
    logger.error('Failed to upload Error:', err);
    throw err;
  } finally {
    if (fs.existsSync(localFile)) {
      fs.unlinkSync(localFile);
    }
  }
};
