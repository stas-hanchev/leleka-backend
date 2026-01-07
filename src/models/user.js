import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    // auth
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

    // profile
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },

    avatarURL: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },

    // pregnancy
    birthDate: {
      type: Date,
      default: null,
    },

    babyGender: {
      type: String,
      enum: ['boy', 'girl', 'unknown'],
      default: 'unknown',
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.token;
  return obj;
};

export const User = model('User', userSchema);
