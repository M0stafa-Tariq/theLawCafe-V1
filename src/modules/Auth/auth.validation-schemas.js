import Joi from "joi";
import { systemRoles } from "../../utils/system-enums.js";

export const signUpSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(20).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
    phoneNumber: Joi.string()
      .pattern(new RegExp("^01[0125][0-9]{8}$"))
      .required(),
    address: Joi.string().required(),
    age: Joi.number().required().min(21).max(100),
    role: Joi.string()
      .valid(systemRoles.ADMIN, systemRoles.CLIENTE, systemRoles.LAWYER)
      .default(systemRoles.CLIENTE),
  }).with("password", "confirmPassword"),
};

export const verifyEmailSchema = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
};

export const signInSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
};

export const forgetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  body: Joi.object({
    newPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmNewPassword: Joi.ref("newPassword"),
  }).with("newPassword", "confirmNewPassword"),
  params: Joi.object({
    token: Joi.string().required(),
  }),
};

export const updatePasswordSchema = {
  body: Joi.object({
    currentPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    newPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmNewPassword: Joi.ref("newPassword"),
  }).with("newPassword", "confirmNewPassword"),
};
