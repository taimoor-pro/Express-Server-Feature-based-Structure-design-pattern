import Joi from "joi";
import { IUser } from "./user.types";

export const UserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of 3",
    "string.max": "Username should have a maximum length of 30",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      ),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special character",
      "any.required": "Password is required",
    }),
  role: Joi.string()
    .valid("supAdmin", "admin", "player", "coach")
    .required()
    .messages({
      "any.only": 'Role must be either "admin" or "other"',
      "any.required": "Role is required",
    }),
});

export const validateUser = (user: IUser) => {
  return UserSchema.validate(user);
};
