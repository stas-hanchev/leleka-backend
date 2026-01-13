import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import {saveFileToCloudinary} from '../utils/saveFileToCloudinary.js';

/** GET  user */
export const getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**  Update user  */
export const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, birthDate, babyGender } = req.body;

    const allowedFields = {};
    if (name) allowedFields.name = name;
    if (birthDate) allowedFields.birthDate = birthDate;
    if (babyGender) allowedFields.babyGender = babyGender;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      allowedFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**  Update avatar */
export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!req.file) {
      throw createHttpError(400, 'Image not uploaded');
    }

    const result = await saveFileToCloudinary(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatarUrl: result.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      message: 'Аватар оновлено успішно',
      avatarUrl: updatedUser.avatarUrl
     });
  } catch (error) {
    next(error);
  }
};
