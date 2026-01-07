import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization required'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(createHttpError(401, 'Token missing'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return next(createHttpError(401, 'Invalid or expired token'));
  }
};
