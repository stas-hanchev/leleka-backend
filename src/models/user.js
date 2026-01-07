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
    birthDate: { type: String, required: false },
    babyGender: { type: String, required: false }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (typeof this.birthDate === 'string') {
    const [day, month, year] = this.birthDate.split('.');
    this.birthDate = new Date(`${year}-${month}-${day}`);
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.token;
  return obj;
};

export const User = model('User', userSchema);
