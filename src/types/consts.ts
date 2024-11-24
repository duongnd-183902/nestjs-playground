import { TFpMap, TString2String } from "./types";

export const MODEL_PROXY: TString2String = {
  "gpt-3.5-turbo": "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo-16k": "gpt-3.5-turbo-16k-0613",
  "gpt-4": "gpt-4-0613",
  "gpt-4-32k": "gpt-4-32k-0613",
  "gpt-4-turbo-preview": "gpt-4-0125-preview",
  "gpt-4-vision-preview": "gpt-4-1106-vision-preview",
  "gpt-4-turbo": "gpt-4-turbo-2024-04-09",
  "gpt-4o": "gpt-4o-2024-05-13",
  "gpt-4o-mini": "gpt-4o-mini-2024-07-18",
  "o1-preview": "o1-preview-2024-09-12",
  "o1-mini": "o1-mini-2024-09-12",
  "claude-3-opus": "claude-3-opus-20240229",
  "claude-3-sonnet": "claude-3-sonnet-20240229",
  "claude-3-haiku": "claude-3-haiku-20240307",
};
export const MODEL_MAPPING: TString2String = {
  "o1-preview": "o1-preview",
  "o1-mini": "o1-mini",
  o1: "o1",
  "gpt-4.5o": "gpt-4.5o",
  "gpt-4o-canmore": "gpt-4o-canmore",
  "gpt-4o-mini": "gpt-4o-mini",
  "gpt-4o": "gpt-4o",
  "gpt-4-mobile": "gpt-4-mobile",
  "gpt-4-gizmo": "gpt-4o",
  "gpt-4": "gpt-4",
  "gpt-3.5": "text-davinci-002-render-sha",
  auto: "auto",
};
// for global map, will move to other place later
export const ERROR_TOKEN_LIST: Array<string> = [];
export const FpMap: { [key: string]: TFpMap } = {};

