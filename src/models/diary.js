import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    // Заголовок записи (из текстового поля модалки)
    title: {
      type: String,
      required: [true, "Заголовок обов'язковий"],
      trim: true,
    },
    // Категории/Эмоции (массив выбранных чекбоксов)
    categories: {
      type: [String],
      required: [true, 'Необхідно вказати хоча б одну категорію'],
      // Мы не перечисляем все 180 эмоций здесь,
      // чтобы не загромождать схему, просто указываем массив строк
    },
    // Текст записи (из поля textarea)
    text: {
      type: String,
      required: [true, "Текст запису є обов'язковим"],
    },
    // Дата: устанавливается автоматически на бэкенде при создании
    date: {
      type: Date,
      default: Date.now,
    },
    // Привязка записи к конкретному пользователю
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Автоматически добавляет поля createdAt и updatedAt
    timestamps: true,
    // Убирает поле __v из выдачи базы данных
    versionKey: false,
  },
);

// Создаем и экспортируем модель
export const Diary = model('diary', diarySchema);
