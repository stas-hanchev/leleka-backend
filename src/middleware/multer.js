import multer from 'multer';
import path from 'path';
import HttpError from '../utils/HttpError.js';

const tempDir = path.resolve('tmp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(HttpError(400, 'Дозволено завантажувати лише зображення'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;
