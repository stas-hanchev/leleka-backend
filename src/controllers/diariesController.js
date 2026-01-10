import Diary from '../models/diary.js';

export const createDiary = async (req, res) => {
  const { text, date, mood } = req.body;

  const diary = await Diary.create({
    text,
    date,
    mood,
    owner: req.user._id,
  });

  res.status(201).json(diary);
};

export const getDiaries = async (req, res) => {
  const diaries = await Diary.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(diaries);
};

export const updateDiary = async (req, res) => {
  const { id } = req.params;

  const diary = await Diary.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    req.body,
    { new: true },
  );

  if (!diary) {
    return res.status(404).json({ message: 'Diary not found' });
  }

  res.json(diary);
};

export const deleteDiary = async (req, res) => {
  const { id } = req.params;

  const diary = await Diary.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  if (!diary) {
    return res.status(404).json({ message: 'Diary not found' });
  }

  res.json({ message: 'Diary deleted' });
};
