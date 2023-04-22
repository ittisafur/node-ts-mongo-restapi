import { Request, Response } from 'express';
import logger from '../utils/logger'

export function createuserHandler(req: Request, res: Response ) {
  try {
    // const user = await 
  } catch (error: any) {
    logger.error(error)
    return res.status(409).send(error.message)
  }
}
