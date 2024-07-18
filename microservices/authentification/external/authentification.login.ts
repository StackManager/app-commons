import axios from 'axios';
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";

  const {
    API_AUTHENTIFICATION_URL,
    API_AUTHENTICATION_PUBLIC_KEY,
    API_AUTHENTICATION_EMAIL,
    API_AUTHENTICATION_PASSWORD,
  } = process.env;

  class AuthServiceExternal {
  
    constructor(private email: string | undefined, private password: string | undefined, private publicKey: string | undefined, private apiUrl: string | undefined) {}
  
    async login(): Promise<void> {
      
      if (!this.email ||
        !this.password ||
        !this.publicKey ||
        !this.apiUrl){
          throw new NotAuthorizedError("API AUTHENTIFICATION FAILED");
        }

      const response = await axios.post(`${this.apiUrl}/authentification/login`, {
        email: this.email,
        password: this.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'key-public': this.publicKey,
        },
      });


      if (response?.status != 200 || !response?.data || !response?.data?.token) {
        throw new NotAuthorizedError("API AUTHENTIFICATION REQUEST FAILED");
      }

      global.tokenAuthentification = response?.data?.token;
    }
}

export const authServiceExternal = new AuthServiceExternal(
  API_AUTHENTICATION_EMAIL,
  API_AUTHENTICATION_PASSWORD,
  API_AUTHENTICATION_PUBLIC_KEY,
  API_AUTHENTIFICATION_URL
);