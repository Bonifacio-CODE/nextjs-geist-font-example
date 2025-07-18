import mqtt from 'mqtt';

const MQTT_CONFIG = {
  host: process.env.MQTT_BROKER || 'nam1.cloud.thethings.network',
  port: parseInt(process.env.MQTT_PORT) || 8883,
  username: process.env.MQTT_USERNAME || 'watermeteru@ttn',
  password: process.env.MQTT_PASSWORD,
  protocol: 'mqtts',
  clientId: `water-meter-${Math.random().toString(16).substr(2, 8)}`,
};

class MQTTClient {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(`mqtts://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}`, {
        username: MQTT_CONFIG.username,
        password: MQTT_CONFIG.password,
        clientId: MQTT_CONFIG.clientId,
        protocol: 'mqtts',
      });

      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        this.connected = true;
        resolve();
      });

      this.client.on('error', (error) => {
        console.error('MQTT connection error:', error);
        reject(error);
      });

      this.client.on('disconnect', () => {
        console.log('Disconnected from MQTT broker');
        this.connected = false;
      });
    });
  }

  subscribe(topic, callback) {
    if (!this.client || !this.connected) {
      console.error('MQTT client not connected');
      return;
    }

    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
        return;
      }
      console.log(`Subscribed to topic: ${topic}`);
    });

    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        callback(topic, data);
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });
  }

  publish(topic, message) {
    if (!this.client || !this.connected) {
      console.error('MQTT client not connected');
      return;
    }

    this.client.publish(topic, JSON.stringify(message), (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log(`Message published to topic: ${topic}`);
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.connected = false;
    }
  }
}

export default new MQTTClient();
