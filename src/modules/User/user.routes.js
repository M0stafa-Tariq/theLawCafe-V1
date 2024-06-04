import { Router } from "express";
import asyncHandler from "express-async-handler";

import * as userController from "./user.controller.js";
import * as validator from "./user.validation-schemas.js";

import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./user.endpoints.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const router = Router();

router.put(
  "/",
  auth(endPointsRoles.UPDATE_USER),
  validationMiddleware(validator.updateUserSchema),
  asyncHandler(userController.updateUser)
);

router.delete(
  "/",
  auth(endPointsRoles.DELETE_USER),
  validationMiddleware(validator.deleteUserSchema),
  asyncHandler(userController.deleteUser)
);

router.patch(
  "/",
  auth(endPointsRoles.DELETE_USER),
  validationMiddleware(validator.softDeleteUserSchema),
  asyncHandler(userController.softDeleteUser)
);

router.get(
  "/profileData",
  auth(endPointsRoles.GET_PROFILE_DATA),
  asyncHandler(userController.getProfileData)
);

router.get(
  "/getUserById/:userId",
  auth(endPointsRoles.GET_USER_BY_ID),
  validationMiddleware(validator.getUserByIdSchema),
  asyncHandler(userController.getUserById)
);

router.get(
  "/getAllUsers",
  auth(endPointsRoles.GET_USER_BY_ID),
  validationMiddleware(validator.getAllUsersSchema),
  asyncHandler(userController.getAllUsers)
);
export default router;
