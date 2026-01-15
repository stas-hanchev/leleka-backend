import createHttpError from 'http-errors';
import { Diary } from '../models/diary.js';

export const createDiaryEntry = async (req, res, next) => {
  try {
    const diaryEntry = await Diary.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json({
      status: 201,
      message: 'Запис успішно створено',
      data: diaryEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getDiaryEntries = async (req, res, next) => {
  try {
    const entries = await Diary.find({ owner: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json({
      status: 200,
      message: 'Записи успішно отримані',
      data: entries,
    });
  } catch (error) {
    next(error);
  }
};

export const getDiaryEntry = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const diaryEntry = await Diary.findOne({
      _id: entryId,
      owner: req.user.id,
    });
    if (!diaryEntry) {
      return next(createHttpError(404, 'Запис у щоденнику не знайдено'));
    }
    res.status(200).json({
      status: 200,
      message: 'Запис успішно знайдено',
      data: diaryEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDiaryEntry = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const diaryEntry = await Diary.findOneAndUpdate(
      { _id: entryId, owner: req.user.id },
      req.body,
      { new: true },
    );
    if (!diaryEntry) {
      return next(createHttpError(404, 'Запис у щоденнику не знайдено'));
    }
    res.status(200).json({
      status: 200,
      message: 'Запис успішно оновлено',
      data: diaryEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDiaryEntry = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const diaryEntry = await Diary.findOneAndDelete({
      _id: entryId,
      owner: req.user.id,
    });
    if (!diaryEntry) {
      return next(createHttpError(404, 'Запис не знайдено'));
    }
    res.status(200).json({
      status: 200,
      message: 'Запис успішно видалено',
      data: { id: entryId },
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDiaryEntry = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const diaryEntry = await Diary.findOneAndDelete({
      _id: entryId,
      owner: req.user.id,
    });
    if (!diaryEntry) {
      return next(createHttpError(404, 'Запис не знайдено'));
    }
    res.status(200).json({
      status: 200,
      message: 'Запис успішно видалено',
      data: { id: entryId },
    });
  } catch (error) {
    next(error);
  }
};
