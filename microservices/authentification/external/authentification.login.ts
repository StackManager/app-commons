import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";

  const {
    API_AUTHENTIFICATION_URL,
    API_AUTHENTICATION_PUBLIC_KEY,
    API_AUTHENTICATION_EMAIL,
    API_AUTHENTICATION_PASSWORD,
    API_AUTHENTIFICATION_EMAIL_EMAIL,
    API_AUTHENTIFICATION_EMAIL_PASSWORD,
    API_EMAIL_PUBLIC_KEY
  } = process.env;

  export const MICROS = {
    AUTHENTIFICATION: 'microserviceAuthentification',
    EMAIL: 'microserviceEmail'
  };

  class AuthServiceExternal {
  
    constructor(
      private email: string | undefined, 
      private password: string | undefined, 
      private publicKey: string | undefined, 
      private apiUrl: string | undefined,
      private key: string) {}
  

    private isTokenValid(token: string): boolean {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decoded.exp > currentTime;
      } catch (error) {
        return false;
      }
    }

    private getToken(){
      try{
        if (global && this.key) {
          const tokenValue = global.token[this.key];
          if (tokenValue) {
            return tokenValue;
          } else {
            return undefined
          }
        } else {
          return undefined;
        }
      }catch{
        return undefined
      }
    }

    async login(): Promise<void> {

      const globalToken = this.getToken()
      if (globalToken && this.isTokenValid(globalToken)) {
        console.log("Token is still valid");
        return;
      }

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

      global.token[this.key] = response?.data?.token;

    }
}

export const authServiceExternal = new AuthServiceExternal(
  API_AUTHENTICATION_EMAIL,
  API_AUTHENTICATION_PASSWORD,
  API_AUTHENTICATION_PUBLIC_KEY,
  API_AUTHENTIFICATION_URL,
  MICROS.AUTHENTIFICATION
);

export const authEmailServiceExternal = new AuthServiceExternal(
  API_AUTHENTIFICATION_EMAIL_EMAIL, //Email del manager email
  API_AUTHENTIFICATION_EMAIL_PASSWORD, //Password del manager email
  API_EMAIL_PUBLIC_KEY, // workspace para quien deseo el acceso
  API_AUTHENTIFICATION_URL, // La url de la authentificacion
  MICROS.EMAIL
);
