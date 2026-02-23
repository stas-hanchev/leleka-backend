import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    token: {
      type: String,
      default: null,
    },


    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },

    avatarUrl: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },


    birthDate: {
      type: Date,
      default: null,
    },

    babyGender: {
      type: String,
      enum: ['Хлопчик', 'Дівчинка', 'Ще не знаю'],
      default: 'Ще не знаю',
    },
  },
  { timestamps: true },
);



userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.token;
  return obj;
};

export const User = model('User', userSchema);
