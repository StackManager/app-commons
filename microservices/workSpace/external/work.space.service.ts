import axios from 'axios';
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";

const {
  API_AUTHENTIFICATION_URL,
  API_AUTHENTICATION_PUBLIC_KEY
} = process.env;

class WorkSpaceServiceExternal {

  constructor(private publicKey: string | undefined, private apiUrl: string | undefined) {}

  async getWorkSpace(): Promise<any> {
    const token = global.tokenAuthentification;

    if (!token) {
      throw new NotAuthorizedError('No token available. Please login first.');
    }

    try {
      const response = await axios.get(`${this.apiUrl}/work-space`, {
        headers: {
          'Authorization': token,
          'key-public': this.publicKey,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          throw new NotAuthorizedError('Unauthorized access.');
        }
      }
      throw new Error('Failed to fetch workspace');
    }
  }
}

export const workSpaceServiceExternal = new WorkSpaceServiceExternal(
  API_AUTHENTICATION_PUBLIC_KEY,
  API_AUTHENTIFICATION_URL
);


