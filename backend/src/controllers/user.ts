import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import UserModel from "src/models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const user = await UserModel.create({
      name: req.body.name,
      profilePictureURL: req.body.profilePictureURL,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user == null) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
