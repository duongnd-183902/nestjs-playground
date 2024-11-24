// import config from "./config";
// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import * as entities from "./entities";

// type NewTypeOrmOptions = {
//   seeds?: string[];
// };

// type CustomTypeOrmModuleOptions = TypeOrmModuleOptions & NewTypeOrmOptions;

// export const ormConfig: CustomTypeOrmModuleOptions = {
//   name: config.DATABASE_NAME,
//   type: "postgres",
//   host: config.DATABASE_HOST,
//   port: Number(config.DATABASE_PORT),
//   username: config.DATABASE_USERNAME,
//   password: config.DATABASE_PASSWORD,
//   database: config.DATABASE_NAME,
//   entities: Object.values(entities),
//   synchronize: false,
//   keepConnectionAlive: true,
//   connectTimeoutMS: 10000,
//   extra: {
//     max: 500,
//   },
//   logging: false,
//   migrationsRun: false,
// };
