import { RequestHandler } from "express";
import UserModel from "src/models/user";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await UserModel.find({}).sort({ name: "asc" });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
