import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createHttpError(401, 'No token provided'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(createHttpError(401, 'Invalid token format'));
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return next(createHttpError(401, 'Invalid or expired token'));
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    req.user = user; // додаємо користувача в запит
    next();
  } catch (err) {
    next(err);
  }
};
