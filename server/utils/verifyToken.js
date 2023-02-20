import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {
  const secret = `${process.env.JWT}`
  const token = req.cookies.jwt;
  if (!token) return next(createError(401, "You are not authenticated!"));
  jwt.verify(token, secret, (err, user) => {
    if (err) return next(createError(403, `Token is not valid!`));
    req.user = user;
    next()
  });
};
