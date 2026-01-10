import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

// -------- REGISTER --------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Перевіряємо, чи існує користувач з такою поштою
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, 'Email in use'));
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо користувача
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Створюємо сесію і ставимо кукі
    const newSession = await createSession(newUser._id);
    setSessionCookies(res, newSession);

    res
      .status(201)
      .json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    next(err);
  }
};

// -------- LOGIN --------
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

    await Session.deleteOne({ userId: user._id });

    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// -------- LOGOUT --------
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

// PATCH /api/auth/:id/welcome
export const sendWelcome = async (req, res) => {
  const { id } = req.params;
  const { gender, dueDate } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Оновлюємо стать дитини
  if (gender) {
    if (!['boy', 'girl', null].includes(gender)) {
      throw createHttpError(400, 'Invalid gender value');
    }
    user.babyGender = gender;
  }

  // Оновлюємо dueDate
  if (dueDate) {
    const date = new Date(dueDate);
    const now = new Date();
    const minDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
    const maxDate = new Date(now.getTime() + 40 * 7 * 24 * 60 * 60 * 1000); // +40 weeks

    if (isNaN(date.getTime()) || date < minDate || date > maxDate) {
      throw createHttpError(
        400,
        `dueDate must be between ${minDate
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
