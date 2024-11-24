import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import {
  ChatModule
} from "./modules";

@Module({
  imports: [
    ChatModule
  ],
})
export class GeneralModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { }
}
