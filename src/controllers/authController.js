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
      return next(createHttpError(401, 'Invalid credentials'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(createHttpError(401, 'Invalid credentials'));
    }

    // Видаляємо стару сесію користувача
    await Session.deleteOne({ userId: user._id });

    // Створюємо нову сесію і ставимо кукі
    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

    res.status(200).json({ message: 'Login successful', userId: user._id });
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

// // PATCH /api/auth/:id/welcome
// export const sendWelcome = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, gender, dueDate } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return next(createHttpError(404, 'User not found'));
//     }

//     // Оновлюємо профіль користувача
//     if (name) user.name = name;
//     if (gender) user.babyGender = gender;
//     if (dueDate) user.birthDate = new Date(dueDate);

//     await user.save();

//     res.status(200).json({
//       message: 'Welcome data saved successfully',
//       user,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
