import { systemRoles } from "../../utils/system-enums.js";

export const endPointsRoles = {
  UPDATE_USER: [systemRoles.CLIENTE,systemRoles.LAWYER],
  DELETE_USER: [systemRoles.ADMIN, systemRoles.CLIENTE, systemRoles.LAWYER],
  GET_PROFILE_DATA: [
    systemRoles.ADMIN,
    systemRoles.CLIENTE,
    systemRoles.LAWYER,
  ],
  GET_USER_BY_ID: [systemRoles.ADMIN],
};
