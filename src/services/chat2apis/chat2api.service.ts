import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import config from "src/config";
import * as types from "src/types";
import { getFp, verifyToken } from "./authorization";
import { handleRequestLimit } from "./chatLimit";
import { Client } from "./client";
import * as uuid from "uuid";
import { getDpl } from "./proofOfWork";

@Injectable()
export class ChatService implements OnModuleInit {
  private accessToken?: string;
  private accountId?: string;
  private requestToken: string;
  private chatToken: string;
  private httpSession: any;
  private webSockerSession: any;
  private originModel: string;
  private responModel: string;
  private requestModel: string;
  private fp: types.TFpMap;
  private proxyUrl?: string;
  private userAgent?: string;
  private impersonate?: string;
  private data: any; // define type later
  private parentMessageId?: string;
  private conversationId?: string;
  private historyDisabled?: boolean;
  private apiMessages: any[] = [];
  private promptToken: any;
  private maxToken: number;
  private hostUrl?: string;
  private ark0seTokenUrl?: string;
  private s: any;
  private chatHeaders: any;
  private chatRequest: any;
  private baseHeaders: any;
  private oaiDeviceId: string;
  private persona?: any;
  private ark0seToken?: any;
  private proofToken?: any;
  private turnstileToken?: any;
  private baseUrl?: string;

  constructor() {
    this.requestToken = config.ACCESS_TOKEN;
    this.chatToken = "gAAAAAB";
  }
  async onModuleInit() {}
  getHello(): string {
    return "Hello World!";
  }
  async setModel(data: any) {
    this.originModel = data.model || "gpt-3.5-turbo-0125";
    this.responModel = types.MODEL_PROXY[this.originModel] || this.originModel;
    const foundKey = Object.keys(types.MODEL_MAPPING).find((key) =>
      this.originModel.includes(key)
    );
    this.requestModel = foundKey ? types.MODEL_MAPPING[foundKey] : "auto";
  }
  async setDynamicData(data: any) {
    if (this.requestToken && this.requestToken.split(",").length == 1) {
      this.accessToken = await verifyToken(this.requestToken);
    }
    if (this.requestToken) {
      this.accessToken = await verifyToken(this.requestToken.split(",")[0]);
      this.accountId = this.requestToken.split(",")[1];
    }

    this.fp = getFp(this.requestToken);
    this.proxyUrl = this.fp["proxy_url"]!;
    this.userAgent = this.fp["user-agent"] || types.USER_AGENT_DEFAULT;
    this.impersonate = this.fp["impersonate"] || types.IMPERSONATE_DEFAULT;
    this.data = data;
    await this.setModel(data);
    if (config.ENABLE_LIMIT && this.requestToken) {
      const limitResponse = handleRequestLimit(
        this.requestToken,
        this.requestModel
      );
      if (limitResponse)
        throw new HttpException(limitResponse, HttpStatus.TOO_MANY_REQUESTS);
    }
    this.accountId = data["Chatgpt-Account-Id"] || this.accountId;
    this.parentMessageId = data["parent_message_id"];
    this.conversationId = data["conversation_id"];
    this.historyDisabled = data["history_disabled"] || false;
    this.apiMessages = data["messages"] || [];
    this.promptToken = 0;
    this.maxToken = data["max_tokens"] || 2147483647;

    this.hostUrl = config.chatgpt_base_url_list.length
      ? config.chatgpt_base_url_list[
          Math.floor(Math.random() * config.chatgpt_base_url_list.length)
        ]
      : "https://chatgpt.com";
    this.ark0seTokenUrl = config.ark0se_token_url_list.length
      ? config.ark0se_token_url_list[
          Math.floor(Math.random() * config.ark0se_token_url_list.length)
        ]
      : undefined;

    this.s = new Client(this.proxyUrl, undefined, true, this.impersonate);
    this.oaiDeviceId = uuid.v4();

    this.baseHeaders = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "oai-device-id": this.oaiDeviceId,
      "oai-language": config.OAI_LANGUAGE,
      origin: this.hostUrl,
      priority: "u=1, i",
      referer: `${this.hostUrl}/`,
      "sec-ch-ua": this.fp["sec-ch-ua"] || types.SEC_CH_UA_DEFAULT,
      "sec-ch-ua-mobile":
        this.fp["sec-ch-ua-mobile"] || types.SEC_CH_UA_MOBILE_DEFAULT,
      "sec-ch-ua-platform":
        this.fp["sec-ch-ua-platform"] || types.SEC_CH_UA_PLATFORM_DEFAULT,
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": this.userAgent,
    };
    if (this.accessToken) {
      this.baseUrl = `${this.hostUrl}/backend-api`;
      this.baseHeaders["authorization"] = `Bearer ${this.accessToken}`;
      if (this.accountId) {
        this.baseHeaders["chatgpt-account-id"] = this.accountId;
      }
    } else {
      this.baseUrl = `${this.hostUrl}/backend-anon`;
    }
    if (config.AUTH_KEY) {
      this.baseHeaders["authkey"] = config.AUTH_KEY;
    }
    await getDpl(this);
  }
}
