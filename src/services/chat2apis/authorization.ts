import { HttpException, HttpStatus } from "@nestjs/common";
import * as types from "../../types";
import { rt2ac } from "./refreshToken";
import config from "src/config";

export const verifyToken = async (
  token: string
): Promise<string | undefined> => {
  if (!token && !config.AUTHORIZATION.length) return;
  if (!token) throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  if (token.startsWith("eyJhbGciOi") || token.startsWith("fk-")) return token;
  if (token.length === 45 && types.ERROR_TOKEN_LIST.includes(token))
    throw new HttpException("Error RefreshToken", HttpStatus.UNAUTHORIZED);
  if (token.length === 45) return rt2ac(token, false);
  return token;
};

export const getFp = (reqToken: string): types.TFpMap => {
  return {}; // TODO
};
