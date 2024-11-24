import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Client {
  private session: AxiosInstance;
  private session2: AxiosInstance;
  private proxies: { http: string | null; https: string | null };
  private timeout: number;
  private verify: boolean;
  private impersonate: string;

  constructor( 
    proxy: string | null = null,
    timeout: number = 15000,
    verify: boolean = true,
    impersonate: string = "safari15_3"
  ) {
    this.proxies = { http: proxy, https: proxy };
    this.timeout = timeout;
    this.verify = verify;
    this.impersonate = impersonate;

    const axiosConfig: AxiosRequestConfig = {
      proxy: this.proxies.http
        ? { host: this.proxies.http, port: 8080 }
        : false,
      timeout: this.timeout,
      httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: this.verify,
      }),
      headers: {
        "User-Agent": this.impersonate,
      },
    };

    this.session = axios.create(axiosConfig);
    this.session2 = axios.create(axiosConfig);
  }

  async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.session.post(url, data, config);
  }

  async postStream(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const headers = config?.headers || this.session.defaults.headers.common;
    const cookies = config?.withCredentials
      ? this.session.defaults.headers.cookie
      : undefined;
    return this.session2.post(url, data, {
      ...config,
      headers,
      withCredentials: !!cookies,
    });
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.session.get(url, config);
  }

  async request(config: AxiosRequestConfig): Promise<any> {
    return this.session.request(config);
  }

  async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.session.put(url, data, config);
  }

  async close(): Promise<void> {
    this.session = null as any;
    this.session2 = null as any;
  }
}
