import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJWT } from "../utils/jwt";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");
  console.log('User id', user._id);

  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get("access_token_Ttl"),
    }
  );

  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      // expiresIn: config.get('refresh_token_Ttl')
      expiresIn: config.get("refresh_token_Ttl"),
    }
  );

  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function getUserSessionHandler(req: Request, res: Response) {
   const userId = res.locals.user._id
    // const sessions = await findSessions();

  const sessions = await findSessions({
    user: userId,
    valid: true 
  });

  return res.status(200).send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response){
  const sessionId = res.locals.user.session;
  await updateSession({
    _id: sessionId,
  }, {valid: false});
  return res.send({
    accessToken: null,
    refreshToken: null
  })
}
