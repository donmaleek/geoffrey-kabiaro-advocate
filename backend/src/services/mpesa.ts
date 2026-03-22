import axios from 'axios';
import crypto from 'crypto';
import { logger } from '../utils/logger';

interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  environment: 'sandbox' | 'production';
}

class MpesaService {
  private config: MpesaConfig;
  private authToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: MpesaConfig) {
    this.config = config;
  }

  private async getAuthToken(): Promise<string> {
    if (this.authToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.authToken;
    }

    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
    const url = this.config.environment === 'sandbox' 
      ? 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });

      this.authToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in - 60) * 1000);
      return this.authToken;
    } catch (error) {
      logger.error('Failed to get M-Pesa token:', error);
      throw new Error('M-Pesa authentication failed');
    }
  }

  async stkPush(phoneNumber: string, amount: number, accountReference: string): Promise<any> {
    const token = await this.getAuthToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${this.config.shortcode}${this.config.passkey}${timestamp}`).toString('base64');

    const url = this.config.environment === 'sandbox'
      ? 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const payload = {
      BusinessShortCode: this.config.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: this.config.shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.API_URL}/api/payments/mpesa-callback`,
      AccountReference: accountReference,
      TransactionDesc: 'Legal Consultation Fee'
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      logger.error('STK Push failed:', error);
      throw new Error('Payment initiation failed');
    }
  }

  async checkTransactionStatus(checkoutRequestId: string): Promise<any> {
    const token = await this.getAuthToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${this.config.shortcode}${this.config.passkey}${timestamp}`).toString('base64');

    const url = this.config.environment === 'sandbox'
      ? 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
      : 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query';

    const payload = {
      BusinessShortCode: this.config.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      logger.error('Transaction status check failed:', error);
      throw new Error('Failed to check transaction status');
    }
  }
}

export default MpesaService;