import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
// import { ormConfig } from "./ormconfig";
import { ScheduleModule } from "@nestjs/schedule";
import { LoggerModule } from "./global_modules";
import { HealthModule } from "./modules";
import { GeneralModule } from "./general.module";
import { HttpExceptionFilter } from "./common/filters";
import config from "./config";

const loadConditionModules = () => {
  const conditionModules = [] as any[];

  return conditionModules;
};

@Module({
  imports: [
    HealthModule,
    GeneralModule,

    // Global module
    LoggerModule,

    // Background jobs
    ScheduleModule.forRoot(),
    ...loadConditionModules(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
