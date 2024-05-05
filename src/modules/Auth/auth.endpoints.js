import { systemRoles } from "../../utils/system-enums.js";

export const endPointsRoles = {
  UPDATE_PASSWORD: [
    systemRoles.ADMIN,
    systemRoles.CLIENTE,
    systemRoles.LAWYER,
  ],
};
