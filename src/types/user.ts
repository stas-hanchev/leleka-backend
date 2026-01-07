import { Types } from 'mongoose';

export type BabyGender = 'boy' | 'girl' | 'unknown';

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  birthDate?: Date;
  babyGender?: BabyGender;
  createdAt: Date;
  updatedAt: Date;
}
