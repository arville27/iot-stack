import { ClientConfig, MiddlewareConfig } from '@line/bot-sdk';
import { IClientOptions } from 'mqtt';

// Setup all LINE client and Express configurations.
export const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET!,
};

export const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET!,
};

export const MQTT_CONFIG: IClientOptions = {
  hostname: process.env.BROKER_HOSTNAME!,
  port: parseInt(process.env.BROKER_PORT!),
  protocol: 'mqtt',
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'iot_guest_notify_bot',
  username: '',
  password: '',
};

export const BROKER_TOPIC = process.env.BROKER_TOPIC!;
