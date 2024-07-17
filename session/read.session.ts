import { Request } from "express";
import { JWT } from "./jwt.session";
import { ISession, ModelSessionPayloadDefault } from "./session.interfaces";
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";

class SessionRead{

  session: ISession = ModelSessionPayloadDefault;
    
  getOrFailed(request: Request, keySecret: string | undefined): ISession {
    if (!keySecret) throw new NotAuthorizedError();
    this.getAuthenticated(request, keySecret);
    return this.session;
  }

  /**
   * Verifies the JWT token from the request and sets the session property.
   * @param request - The request object from which to extract the JWT token.
   * @throws NotAuthorizedError if the JWT token is invalid or missing.
   */
  private getSession(request: Request, keySecret: string): void {

      //const jwt = request?.session?.jwt;
      const token = request.headers['authorization'];
      if (!token) throw new NotAuthorizedError("JWT is missing");
      // console.log(token)
      // Verify the structure of the JWT before proceeding.
      if (!this.isJwtStructureValid(token)) throw new NotAuthorizedError("Invalid JWT structure");

      // Verify the JWT token and check its expiration.
      this.session = JWT.getVerify({token, keySecret}) as ISession;
      if (!this.session) throw new NotAuthorizedError("Invalid JWT token");

      // Check if the JWT is expired.
      //if (this.isJwtExpired(this.session)) throw new NotAuthorizedError("JWT token is expired");

      // Check the audience and issuer.
      //if (!this.isJwtAudienceValid(this.session)) throw new NotAuthorizedError("Invalid JWT audience");
      //if (!this.isJwtIssuerValid(this.session)) throw new NotAuthorizedError("Invalid JWT issuer");

      // Check if the JWT is in the revocation list.
      //if (this.isJwtRevoked(jwt)) throw new NotAuthorizedError("JWT token has been revoked");

      // Check IP address (optional, for added security)
      //if (!this.isIpAddressAllowed(request)) throw new NotAuthorizedError("IP address not allowed");

  }

  /**
   * Checks if the JWT token is expired.
   * @param session - The session object containing the JWT payload.
   * @returns true if the JWT is expired.
   */
  // private isJwtExpired(session: ISession): boolean {
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   return session.exp < currentTime;
  // }

  /**
   * Checks if the JWT structure is valid.
   * @param jwt - The JWT token to check.
   * @returns true if the structure is valid.
   */
    private isJwtStructureValid(jwt: string): boolean {
      const parts = jwt.split('.');
      return parts.length === 3;
    }

  /**
   * Checks if the client is authenticated by verifying the user session.
   * Calls the getVerifySession function to retrieve and verify the session information.
   * If the session is valid, it means the user is authenticated.
   * If the session is invalid or missing, it throws a NotAuthorizedError.
   *
   * @param request - The request object from which to extract the JWT token.
   * @throws NotAuthorizedError if the session is invalid or missing, indicating the client is not authenticated.
   * @returns A Promise that resolves to true when the client is authenticated.
   */
  private getAuthenticated(request: Request, keySecret: string): boolean {
    // Get and verify the session information from the request.
    this.getSession(request, keySecret);

    // Check if the session is valid. If not, throw a NotAuthorizedError.
    if (!this.session) {
      throw new NotAuthorizedError();
    }

    // If the session is valid, return true to indicate that the client is authenticated.
    return true;
  }

}

export { SessionRead };