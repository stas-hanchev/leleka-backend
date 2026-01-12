import multer from 'multer';
import createHttpError from 'http-errors';

const fileFilter = (_, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(
      createHttpError(400, 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.')
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;
