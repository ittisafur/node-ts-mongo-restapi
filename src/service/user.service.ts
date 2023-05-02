import { omit } from "lodash";
import User, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery } from "mongoose";

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>){
  return User.findOne(query).lean();
}
