import { AuthDoc } from "@Configuration/schemas/authentification/auth/interfaces/auth.schema";
import { Request } from "express";
import { JWT } from "./jwt.session";


/**
 * Class to manage and record session information in the model.
 */
class SessionSave{
  
  /**
   * Express Request object.
   * @type {Request}
   */
  request: Request;

  /**
   * Creates a new instance of ModelSessionDataRecoder.
   * @param {Request} request - Express Request object.
   */
  constructor(request: Request){
    this.request = request;
  }

  /**
   * Gets the session parameters from the user data.
   * @param {any} user - Object representing the user with its data.
   * @returns {Object} - Object with the session parameters.
   */
  private getSessionParams(authDoc: AuthDoc){

    const now = Date.now();
    const expiresIn = process.env.SESSION_MAX_AGE || 86400000;
    const expiresAt: number = now + (typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn) * 1000;

    return {
      id: authDoc._id,
      email: authDoc.email,
      langId: authDoc.langId,
      createdAt: now,
      expiresAt: expiresAt
    };
  }

  private setSessionRequest (jwt: any){
    this.request.session = { 
      jwt: jwt 
    };
  }

  /**
   * Sets the Request session and saves the session token in the user.
   * @param {any} user - Object representing the user with its data.
   * @returns {Promise<string>} - Promise that resolves with the generated session token.
   */
  set(authDoc: AuthDoc) {
    const data = this.getSessionParams(authDoc);
    const jwt = JWT.getSign(data);
    this.setSessionRequest(jwt)  
    return jwt;
  }

}

export { SessionSave };