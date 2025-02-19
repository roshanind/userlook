import { GENDER } from "@constants/user.constants";

export type Gender = typeof GENDER[keyof typeof GENDER];

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  city: string;
  country: string;
  birthday: string;
  nic: string;
  profileImage: string;
  phoneNumber: string;
}