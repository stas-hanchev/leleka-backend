import createHttpError from 'http-errors';
import { BabyState } from '../models/babyState.js';
import { MomState } from '../models/momState.js';
import { getPregnancyStats } from '../utils/calculatePregnancy.js';

export const getPublicDashboard = async (req, res, next) => {
  try {
    const weekNumber = Number(req.query.week) || 1;
    const babyData = await BabyState.findOne({ weekNumber });

    if (!babyData) return next(createHttpError(404, 'Тиждень не знайдено'));

    res.json({
      weekNumber,
      daysRemaining: 280,
      babyData
    });
  } catch (error) { next(error); }
};

export const getPrivateDashboard = async (req, res, next) => {

  try {
    const { dueDate } = req.user;

    const { currentWeek, daysRemaining } = getPregnancyStats(dueDate);

    const babyData = await BabyState.findOne({ weekNumber: currentWeek });

    if (!babyData) return next(createHttpError(404, 'Дані для вашого поточного тижня відсутні'));

    res.json({
      weekNumber: currentWeek,
      daysRemaining,
      babyData
    });
  } catch (error) { next(error); }
};

export const getBabyDevelopment = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);
    const data = await BabyState.findOne({ weekNumber });

    if (!data) return next(createHttpError(404, 'Дані про розвиток дитини не знайдено'));

    res.json({
      babyDevelopment: data.babyDevelopment,
      image: data.image,
      interestingFact: data.interestingFact
    });
  } catch (error) { next(error); }
};

export const getMomBody = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);
    const data = await MomState.findOne({ weekNumber });

    if (!data) return next(createHttpError(404, 'Дані про тіло мами не знайдено'));

    res.json(data);
  } catch (error) { next(error); }
};
