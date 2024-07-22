import axios from 'axios';
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { authEmailServiceExternal, MICROS } from '@Commons/microservices/authentification/external/authentification.login';

const {
  API_EMAIL_PUBLIC_KEY,
  API_EMAIL_URL
} = process.env;

interface EmailServiceExternalSentEmail{
  recipient: string,
  slug: string,
  vars: any
}

class EmailServiceExternal {

  constructor(private publicKey: string | undefined, private apiUrl: string | undefined) {}



  async sentEmail(payload: EmailServiceExternalSentEmail): Promise<any> {

    await authEmailServiceExternal.login()
    const token = global.token[MICROS.EMAIL];

    if (!token) {
      console.log('No token available. Please login first.')
      throw new Error()
    }

    try {

      const response = await axios.post(`${this.apiUrl}/email-sheduler`, {
        recipient: payload.recipient,
        slug: payload.slug,
        vars: payload.vars
      }, {
        headers: {
          'Content-Type': 'application/json',
          'key-public': this.publicKey,
          'Authorization': token
        },
      });

      return response.data;
    } catch (error) {
      console.log('Failed to fetch email')
      if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
      }
    }
  }
}

export const emailServiceExternal = new EmailServiceExternal(
  API_EMAIL_PUBLIC_KEY,
  API_EMAIL_URL
);
