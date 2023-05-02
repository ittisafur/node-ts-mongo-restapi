import jwt from "jsonwebtoken";
import config from "config";

const private_key = config.get<string>("private_key");
const public_key = config.get<string>("public_key");

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, private_key, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decode = jwt.verify(token, public_key);

    return {
      valid: true,
      expired: false,
      decoded: decode,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
