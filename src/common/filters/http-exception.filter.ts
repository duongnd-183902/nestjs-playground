import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errData: any =
      exception instanceof HttpException
        ? typeof exception?.getResponse() === "object"
          ? {
              ...(exception?.getResponse() as object),
              details: (exception as any)?.options,
            }
          : exception?.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
          };

    const terms = ["SSOService", "ConfluentService"];
    if (terms.some((term) => errData.message.includes(term))) {
      errData.details = {
        type: errData.details?.code,
        code: errData.statusCode,
      };
    }
    response.status(status).json(errData);
  }
}
