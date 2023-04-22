import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createuserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    // const user = await
    const user = await createUser(req.body);
    return res.status(201).send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
