import { systemRoles } from "../../utils/system-enums.js";

export const endPointsRoles = {
  ADD_CASE: systemRoles.CLIENTE,
  DELETE_CASE_BY_ID:[systemRoles.ADMIN,systemRoles.CLIENTE],
  GET_CASE_BY_ID:[systemRoles.ADMIN,systemRoles.CLIENTE,systemRoles.LAWYER],
  GET_ALL_CASES:systemRoles.ADMIN,
  GET_ALL_CASES_FOR_LAWYER_OWNER:systemRoles.LAWYER
};
