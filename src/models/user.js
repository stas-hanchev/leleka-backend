import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    avatarUrl: {
      type: String,
      required: false,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
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
  return obj;
};

export const User = model('User', userSchema);
