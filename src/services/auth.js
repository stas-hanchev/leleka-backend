import crypto from 'crypto';
import { FIFTEEN_MINUTES, TEN_YEAR } from '../constants/time.js';
import { Session } from '../models/session.js';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TEN_YEAR),
    refreshTokenValidUntil: new Date(Date.now() + TEN_YEAR),
  });
};

const isProd = process.env.NODE_ENV === 'production';

export const setSessionCookies = (res, session) => {
  const common = {
    httpOnly: true,
    secure: isProd ? true : false,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    domain: isProd ? '.vercel.app' : ''
  };

  console.log('!!! Common:', common);

  res.cookie('accessToken', session.accessToken, {
    ...common,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...common,
    maxAge: TEN_YEAR,
  });

  res.cookie('sessionId', String(session._id), {
    ...common,
    maxAge: TEN_YEAR,
  });
};
