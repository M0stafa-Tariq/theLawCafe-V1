import { Router } from "express";
import asyncHandler from "express-async-handler";

import * as caseController from "./case.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./case.endpoints.js";
import { multerMiddleHost } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";

const router = Router();
router.post(
  "/addCase",
  auth(endPointsRoles.ADD_CASE),
  multerMiddleHost({ extensions: allowedExtensions.document }).single(
    "caseFile"
  ),
  asyncHandler(caseController.addCase)
);

router.put(
  "/updateCase/:caseId",
  auth(endPointsRoles.ADD_CASE),
  multerMiddleHost({ extensions: allowedExtensions.document }).single(
    "caseFile"
  ),
  asyncHandler(caseController.updateCase)
);

router.delete(
  "/deleteCase/:caseId",
  auth(endPointsRoles.DELETE_CASE_BY_ID),
  asyncHandler(caseController.deleteCaseById)
);

router.get(
  "/getCaseById/:caseId",
  auth(endPointsRoles.GET_CASE_BY_ID),
  asyncHandler(caseController.getCasetById)
);

router.get(
  "/getAllCases",
  auth(endPointsRoles.GET_ALL_CASES),
  asyncHandler(caseController.getAllCases)
);

router.get(
  "/getAllNewCases",
  auth(endPointsRoles.GET_ALL_CASES),
  asyncHandler(caseController.getAllNewCases)
);

router.get(
  "/getAllMyCasesAsClient",
  auth(endPointsRoles.ADD_CASE),
  asyncHandler(caseController.getAllCasesForClientOwner)
);

router.get(
  "/getAllMyCasesAsLawyer",
  auth(endPointsRoles.GET_ALL_CASES_FOR_LAWYER_OWNER),
  asyncHandler(caseController.getAllCasesForLawyerOwner)
);

router.patch(
  "/assingLawyer",
  auth(endPointsRoles.GET_ALL_CASES),
  asyncHandler(caseController.assignLawyerToCase)
);
export default router;
