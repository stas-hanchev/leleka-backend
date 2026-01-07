import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw createHttpError(401, 'Missing access token');

    const session = await Session.findOne({ accessToken: token });
    if (!session) throw createHttpError(401, 'Session not found');

    const isExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isExpired) throw createHttpError(401, 'Access token expired');

    const user = await User.findById(session.userId);
    if (!user) throw createHttpError(401, 'User not found');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
