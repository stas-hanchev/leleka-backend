import axios from "axios";
import { User } from '../types/user';

export const updateUser = async (data: Partial<User>) => {
  const res = await axios.patch("/users", data);
  return res.data.user;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await axios.patch("/users/avatar", formData);
  return res.data.avatarUrl;
};
