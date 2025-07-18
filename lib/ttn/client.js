 import axios from 'axios';

const TTN_CONFIG = {
  baseURL: process.env.TTN_API_BASE || 'https://nam1.cloud.thethings.network/api/v3',
  apiKey: process.env.TTN_API_KEY,
  applicationId: process.env.TTN_APPLICATION_ID || 'watermeteru',
  tenantId: process.env.TTN_TENANT_ID || 'ttn',
};

class TTNClient {
  constructor() {
    this.client = axios.create({
      baseURL: TTN_CONFIG.baseURL,
      headers: {
        'Authorization': `Bearer ${TTN_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Device Management
  async getDevices() {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}/devices`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  }

  async getDevice(deviceId) {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}/devices/${deviceId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching device:', error);
      throw error;
    }
  }

  async createDevice(deviceData) {
    try {
      const response = await this.client.post(
        `/applications/${TTN_CONFIG.applicationId}/devices`,
        deviceData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating device:', error);
      throw error;
    }
  }

  async updateDevice(deviceId, deviceData) {
    try {
      const response = await this.client.put(
        `/applications/${TTN_CONFIG.applicationId}/devices/${deviceId}`,
        deviceData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating device:', error);
      throw error;
    }
  }

  async deleteDevice(deviceId) {
    try {
      const response = await this.client.delete(
        `/applications/${TTN_CONFIG.applicationId}/devices/${deviceId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting device:', error);
      throw error;
    }
  }

  // Gateway Management
  async getGateways() {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}/gateways`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching gateways:', error);
      throw error;
    }
  }

  async getGateway(gatewayId) {
    try {
      const response = await this.client.get(
        `/gateways/${gatewayId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching gateway:', error);
      throw error;
    }
  }

  // Downlink Messages
  async sendDownlink(deviceId, downlinkData) {
    try {
      const response = await this.client.post(
        `/applications/${TTN_CONFIG.applicationId}/devices/${deviceId}/down/push`,
        {
          downlinks: [{
            frm_payload: Buffer.from(downlinkData.payload).toString('base64'),
            f_port: downlinkData.port || 1,
            priority: downlinkData.priority || 'NORMAL',
            confirmed: downlinkData.confirmed || false,
          }]
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending downlink:', error);
      throw error;
    }
  }

  // Application Data
  async getApplicationData() {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching application data:', error);
      throw error;
    }
  }

  // Webhooks
  async getWebhooks() {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}/webhooks`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      throw error;
    }
  }

  // Integrations
  async getIntegrations() {
    try {
      const response = await this.client.get(
        `/applications/${TTN_CONFIG.applicationId}/integrations`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
  }
}

export default new TTNClient();
