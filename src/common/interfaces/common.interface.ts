import { ApiProperty } from "@nestjs/swagger";

export class Count {
  @ApiProperty()
  count: number;
}

export enum SentimentEnum {
  POSITIVE = 0,
  NEGATIVE = 1,
  NEUTRAL = 2,
}

export enum TwitterCheckmarkColorEnum {
  NO_COLOR = 0,
  BLUE = 1,
  GOLD = 2,
  GRAY = 3,
}

export enum SupportedArticleLanguageEnum {
  ENGLISH = "en",
  VIETNAMESE = "vi",
  SPANISH = "es",
  RUSSIAN = "ru",
  KOREAN = "ko",
  CHINESE = "zh",
}

export enum SupportedTypes {
  DEPOSIT = "DEPOSIT",
  PAYMENT = "PAYMENT",
}

export enum Status {
  PENDING = 0,
  SUCCESS = 1,
  FAIL = 2,
}
