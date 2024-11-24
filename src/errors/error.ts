import { ERROR_CODES } from "./code.error";
import { ERROR_TYPES } from "./types.error";

type ERROR = Partial<
  {
    [key in keyof typeof ERROR_TYPES]: any;
  } & {
    [index: string]: any;
  }
>;

export const ERRORS: ERROR = {};

Object.keys(ERROR_TYPES).forEach((e) => {
  ERRORS[e] = {
    type: ERROR_TYPES[e as keyof typeof ERROR_TYPES],
    code: ERROR_CODES[e as keyof typeof ERROR_CODES],
  };
});
