import {
  BadRequestException,
  LogLevel,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import config from "./config";
import { LOG_LEVEL_MAPPING, LOG_LEVEL_NEST } from "./constants";

declare const module: any;

async function bootstrap() {
  const logLevel = LOG_LEVEL_MAPPING[config.LOG_LEVEL || "INFO"];
  const app = await NestFactory.create(AppModule, {
    logger: LOG_LEVEL_NEST.slice(logLevel) as LogLevel[],
  });

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = [];
        for (const error of errors) {
          message.push({
            property: error.property,
            constraints: error.constraints,
            details: config?.ENV_PROJECT !== "PRODUCTION" ? error : null,
          });
        }
        return new BadRequestException(message);
      },
    }),
  );

  if (config?.SWAGGER === "yes") {
    const options = new DocumentBuilder()
      .setTitle("Nestjs Backend")
      .setVersion("1.0.0")
      .addBearerAuth()
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(config.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
