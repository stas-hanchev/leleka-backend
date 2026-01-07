import { BabyState } from '../models/babyState.js';
import { MomState } from '../models/momState.js';
import { getDaysRemaining } from '../utils/calculateDays.js';
import createHttpError from 'http-errors';

export const getPublicDashboard = async (req, res, next) => {
  try {
    const weekNumber = Number(req.query.week) || 1;
    const babyData = await BabyState.findOne({ weekNumber });
    res.json({ weekNumber, daysRemaining: 280, babyData });
  } catch (error) { next(error); }
};

export const getPrivateDashboard = async (req, res, next) => {
  try {
    const { expectedDateOfBirth, currentWeek } = req.user;
    const daysRemaining = getDaysRemaining(expectedDateOfBirth);
    const babyData = await BabyState.findOne({ weekNumber: currentWeek });
    res.json({ weekNumber: currentWeek, daysRemaining, babyData });
  } catch (error) { next(error); }
};

export const getBabyDevelopment = async (req, res, next) => {
  try {
    const { weekNumber } = req.params;
    const data = await BabyState.findOne({ weekNumber: Number(weekNumber) });

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
    const { weekNumber } = req.params;
    const data = await MomState.findOne({ weekNumber: Number(weekNumber) });

    if (!data) return next(createHttpError(404, 'Дані про тіло мами не знайдено'));

    res.json(data);
  } catch (error) { next(error); }
};


