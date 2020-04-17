import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";

import { DocumentDao } from "@daos/DocumentDao";
import { paramMissingError } from "@shared/constants";

// Init shared
const router = Router();
const documentDao = new DocumentDao();

/******************************************************************************
 *                      Get All Images - "GET /api/images/all"
 ******************************************************************************/

router.get("/", async (req: Request, res: Response) => {
  const documents = await documentDao.getAll();
  return res.status(OK).json({ documents });
});

/******************************************************************************
 *                      Get One Images - "GET /api/images/:id"
 ******************************************************************************/

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  const document = await documentDao.get(Number(id));
  return res.status(OK).json({ document });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
