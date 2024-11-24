declare module "pino-elasticsearch" {
  import { ConnectionOptions as TlsConnectionOptions } from "tls";
  import Connection, {
    AgentOptions,
  } from "@elastic/elasticsearch/lib/Connection";
  import {
    BasicAuth,
    ApiKeyAuth,
    BearerAuth,
  } from "@elastic/elasticsearch/lib/pool";

  type DynamicIndexFunction = (logTime: string) => string;

  interface NodeOptions {
    url: URL;
    id?: string;
    agent?: AgentOptions;
    ssl?: TlsConnectionOptions;
    headers?: Record<string, any>;
    roles?: {
      master: boolean;
      data: boolean;
      ingest: boolean;
      ml: boolean;
    };
  }

  export interface Options {
    index?: string | DynamicIndexFunction;
    op_type?: string;
    "es-version"?: number;
    "flush-bytes"?: number;
    node?: string | string[] | NodeOptions | NodeOptions[];
    auth?: BasicAuth | ApiKeyAuth | BearerAuth;
    cloud?: {
      id: string;
      // TODO: remove username and password here in 8
      username?: string;
      password?: string;
    };
    ssl?: TlsConnectionOptions;
    Connection?: typeof Connection;
    consistency?: string;
  }

  interface DestinationStream {
    write(msg: string): void;
    on(event: "error", listener: any): void;
    on(event: "unknown", listener: any): void;
    on(event: "insertError", listener: any): void;
    on(event: "insert", listener: any): void;
  }

  export default function pinoElasticSearch(opts: Options): DestinationStream;
}
