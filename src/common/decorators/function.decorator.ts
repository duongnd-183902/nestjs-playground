import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { LoggerService } from "src/global_modules";

export function asyncTimer(
  target: any,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor,
): PropertyDescriptor {
  const LoggerServiceInjector = Inject(LoggerService);
  LoggerServiceInjector(target, "loggerService");

  propertyDescriptor =
    propertyDescriptor || Object.getOwnPropertyDescriptor(target, propertyKey);

  const originalMethod = propertyDescriptor.value;
  propertyDescriptor.value = async function (...args: any[]) {
    const loggerService = this.loggerService as LoggerService;

    const t0 = new Date().valueOf();
    try {
      const result = await originalMethod.apply(this, args);

      return result;
    } catch (err) {
      const spentTime = ((new Date().valueOf() - t0) * 0.001).toFixed(3);

      loggerService.log("error", {
        method: propertyKey,
        className: target.constructor.name,
        request: "internal",
        agent: "internal",
        ip: "internal",
        bytes: 0,
        input: err instanceof HttpException ? err?.getResponse() : err?.message,
        statusCode:
          err instanceof HttpException ? err.getStatus() : HttpStatus.FORBIDDEN,
        result: err instanceof HttpException ? err?.message : err?.stack,
        timeProcessing: parseFloat(spentTime),
      });
      throw err;
    }
  };
  return propertyDescriptor;
}

// export function syncTimer(
//   target: any,
//   propertyKey: string,
//   propertyDescriptor: PropertyDescriptor,
// ): PropertyDescriptor {
//   propertyDescriptor =
//     propertyDescriptor || Object.getOwnPropertyDescriptor(target, propertyKey);

//   const timername =
//     (target instanceof Function
//       ? `static ${target.name}`
//       : target.constructor.name) + `::${propertyKey}`;
//   const originalMethod = propertyDescriptor.value;
//   propertyDescriptor.value = function (...args: any[]) {
//     const t0 = new Date().valueOf();
//     console.log(`[timer] [${timername}]: begin`);
//     try {
//       const result = originalMethod.apply(this, args);
//       console.log(
//         `[timer] [${timername}]: timer ${(
//           (new Date().valueOf() - t0) *
//           0.001
//         ).toFixed(3)}s`,
//       );
//       return result;
//     } catch (err) {
//       console.log(
//         `[timer] [${timername}]: timer ${(
//           (new Date().valueOf() - t0) *
//           0.001
//         ).toFixed(3)}s`,
//       );
//       throw err;
//     }
//   };
//   return propertyDescriptor;
// }
