import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(400, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const newSession = await createSession(newUser._id);
    setSessionCookies(res, newSession);

    res
      .status(201)
      .json(newUser);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createHttpError(401, 'Invalid credentials');
    }

    await Session.deleteMany({ userId: user._id });

    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};


export const sendWelcome = async (req, res) => {
  const { id } = req.params;
  const { gender, birthDate } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }


  if (gender) {
    if (!['boy', 'girl', 'unknown'].includes(gender)) {
      throw createHttpError(400, 'Invalid gender value');
    }
    user.babyGender = gender;
  }


  if (birthDate) {
    const date = new Date(birthDate);
    const now = new Date();
    const minDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
    const maxDate = new Date(now.getTime() + 40 * 7 * 24 * 60 * 60 * 1000); // +40 weeks

    if (isNaN(date.getTime()) || date < minDate || date > maxDate) {
      throw createHttpError(
        400,
        `birthDate must be between ${minDate
          .toISOString()
          .slice(0, 10)} and ${maxDate.toISOString().slice(0, 10)}`,
      );
    }

    user.birthDate = date;
  }

  await user.save();

  res.status(200).json({
    message: 'Welcome data saved successfully',
    user,
  });
};



export const refreshUserSession = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw createHttpError(401, 'Refresh token missing');

  const session = await Session.findOne({ refreshToken });
  if (!session) throw createHttpError(401, 'Session not found');

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpired) throw createHttpError(401, 'Session token expired');

  await Session.deleteOne({ _id: session._id });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });


  if (!user) {
    return res.status(200).json({ message: 'Password reset email sent successfully' });
  }


  const resetToken = jwt.sign(
    { sub: user._id, email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' },
  );


  const templatePath = path.resolve('src/templates/reset-password-email.html');

  const templateSource = await fs.readFile(templatePath, 'utf-8');

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.username,
    link: `${process.env.FRONTEND_DOMAIN}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',

      html,
    });
  } catch {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }

  res.status(200).json({ message: 'Password reset email sent successfully' });
};

export const resetPassword = async (req, res) => {
	const { token, password } = req.body;


  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {

    throw createHttpError(401, 'Invalid or expired token');
  }


  const user = await User.findOne({  _id: payload.sub,  email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne(
	  { _id: user._id },
	  { password: hashedPassword }
  );


  await Session.deleteMany({ userId: user._id });


  res.status(200).json({
    message: 'Password reset successfully',
  });
};
