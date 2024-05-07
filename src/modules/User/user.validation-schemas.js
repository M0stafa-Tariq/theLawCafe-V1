import Joi from "joi";
import { generalValidationRule } from "../../utils/general.validation.rule.js";
import { systemRoles } from "../../utils/system-enums.js";

export const updateUserSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(20).trim(),
    email: Joi.string().email(),
    phoneNumber: Joi.string().pattern(new RegExp("^01[0125][0-9]{8}$")),
    address: Joi.string(),
    age: Joi.number().min(21).max(100),
    role: Joi.string().valid(systemRoles.LAWYER, systemRoles.CLIENTE),
  }),
};

export const deleteUserSchema = {
  query: Joi.object({
    userId: generalValidationRule.dbId,
  }),
};

export const softDeleteUserSchema = {
  query: Joi.object({
    userId: generalValidationRule.dbId,
  }),
};

export const getUserByIdSchema = {
  params: Joi.object({
    userId: generalValidationRule.dbId,
  }),
};
