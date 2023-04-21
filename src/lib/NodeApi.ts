import axios, { AxiosRequestConfig } from 'axios';

type NodeApiConfig = { url: string; macaroon: string };

export default class NodeApi {
  config: NodeApiConfig;

  constructor(config: NodeApiConfig) {
    this.config = config;
  }

  async request(params: AxiosRequestConfig) {
    const requestConfig = {
      url: this.config.url,
      ...params,
      Headers: {
        'Content-Type': 'application/json',
        'Grpc-Metadata-macaroon': this.config.macaroon,
      },
    };
    await axios(requestConfig);
  }
}
