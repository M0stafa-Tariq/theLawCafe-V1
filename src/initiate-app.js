import cors from "cors"

import db_connection from "../DB/connection.js";
import { globalResponse } from "./middlewares/global-response.middleware.js";
import { rollbackSavedDocuments } from "./middlewares/rollback-save-documents.middleware.js";
import { rollbackUploadedFiles } from "./middlewares/rollback-uploaded-files.middlewares.js";
import * as routers from "./modules/index.routes.js";


export const initiateApp = async (app, express) => {
  const port = process.env.PORT;

  app.use(express.json());

  app.use(cors())

  await db_connection();

  app.use("/auth", routers.authRouter);
  app.use("/user", routers.userRouter);

  app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Page not found!" });
  });

  app.use(globalResponse, rollbackUploadedFiles, rollbackSavedDocuments);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
