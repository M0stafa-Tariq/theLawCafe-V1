import Joi from "joi";
import { generalValidationRule } from "../../utils/general.validation.rule.js";

export const addCaseSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(100).trim().required(),
    description: Joi.string().min(3).max(1000).trim().required(),
    phoneNumber: Joi.string()
      .pattern(new RegExp("^01[0125][0-9]{8}$"))
      .required(),
    numberOfCase: Joi.string().alphanum().trim().required(),
  }),
};

export const updateCaseSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(100).trim(),
    description: Joi.string().min(3).max(1000).trim(),
    phoneNumber: Joi.string().pattern(new RegExp("^01[0125][0-9]{8}$")),
    numberOfCase: Joi.string().alphanum().trim(),
    oldPublicId: Joi.string(),
  }),
};

export const deleteCaseSchema = {
  params: Joi.object({
    caseId:generalValidationRule.dbId,
  }),
};

export const getCaseByIdSchema = {
  params: Joi.object({
    caseId:generalValidationRule.dbId,
  }),
};

export const assignLawyerToCaseSchema = {
  query: Joi.object({
    caseId:generalValidationRule.dbId,
    lawyerId:generalValidationRule.dbId,
  }),
};

