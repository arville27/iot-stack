import mqtt from 'mqtt';
import { MQTT_CONFIG } from './config';

export const mqttClient = mqtt.connect(MQTT_CONFIG);
