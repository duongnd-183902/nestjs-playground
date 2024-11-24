import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return data ? req.user && req.user[data] : req.user;
  },
);

export const AccessToken = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest() as Request;
    const authorization = req.headers?.authorization;
    const token = authorization?.split?.(" ")?.[1];

    if (!token?.length) {
      throw new UnauthorizedException();
    }
    return token;
  },
);

export class TokenSecurityOptionDto {
  notCheckConnectedWallet?: boolean;
  scopes?: string[];
}

export const TokenSecurityOptionMetadata = "TokenSecurityOption";

export const TokenSecurityOption = (option?: TokenSecurityOptionDto) =>
  SetMetadata(TokenSecurityOptionMetadata, option);
