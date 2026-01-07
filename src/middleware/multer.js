import multer from 'multer';
import path from 'path';
import createHttpError from 'http-errors';

const tempDir = path.resolve('tmp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(createHttpError(400, 'Дозволено завантажувати лише зображення'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export default upload;
