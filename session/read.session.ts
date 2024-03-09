import { Request } from "express";
import { ISession, ModelSessionPayloadDefault } from "./session.interfaces";
import { JWT } from "./jwt.session";
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";


 
class SessionRead{

  session: ISession = ModelSessionPayloadDefault;
    
  getOrFailed(request: Request): ISession{

    this.getAuthenticated(request);
    return this.session;
  }

  /**
   * Retrieves the session information by verifying the JWT token from the request.
   * If the JWT token is valid, sets the session property to the verified session object.
   * If the JWT token is invalid or missing, sets the session property to undefined.
   *
   * @param request - The request object from which to extract the JWT token.
   * @throws Error if there is an issue with JWT verification, but it does not throw any specific error.
   * @returns A Promise that resolves when the session is verified or undefined when the JWT token is invalid or missing.
   */
  private  getVerifySession(request: Request): void {
    try {
      // Get the JWT token from the request's session property.
      const jwt = request?.session?.jwt;

      // Verify the JWT token and set the session property with the verified session object.
      // If the verification fails, this.session will be set to undefined.
      this.session =  JWT.getVerify(jwt) as ISession;
      
    } catch (err) {
      // If there is an error during JWT verification, set the session property to undefined.
      this.session = ModelSessionPayloadDefault;
    }
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
  private getAuthenticated(request: Request): boolean {
    // Get and verify the session information from the request.
    this.getVerifySession(request);

    // Check if the session is valid. If not, throw a NotAuthorizedError.
    if (!this.session) {
      throw new NotAuthorizedError();
    }

    // If the session is valid, return true to indicate that the client is authenticated.
    return true;
  }



  // async getIsClientHasPermission(permissionsService: IPermissionService[] | undefined){
    
  //   if (!permissionsService || !this.session || permissionsService.length == 0) throw new NotAuthorizedError();
    
  //   //console.log("getIsClientHasPermission");
  //   //console.log(this.session, permissionsService);

  //   const user = await Auth.findOne({ email: this.session.email, status: true }, 'roleId');

  //   if (!user) throw new NotAuthorizedError();

  //   const role = await Role
  //   .findOne({ _id: user.roleId, status: true }, 'permissions')
  //   .populate({
  //     path: 'permissions',
  //     match: { slug: permissionsService[0].permission[0], status: true },
  //     select: 'slug'
  //   })
  //   .exec();

  //   if (!role || role?.permissions.length == 0) throw new NotAuthorizedError();

  // }

}

export { SessionRead };