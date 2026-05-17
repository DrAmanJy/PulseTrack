import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from '../errors/AppError.js';

const publicPath = path.join(process.cwd(), 'public/uploads/avatars');

if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const cleanFileName = `user-${req.user.id}-${Date.now()}${ext}`;

    cb(null, cleanFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only PNG, JPG, or WEBP.', 400), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
