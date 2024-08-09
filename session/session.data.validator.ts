import { Request } from 'express';
import { SessionRead } from '@Commons/session/read.session';
import { findMatches } from '@Commons/functions/arrayInArray';
import { NotAuthorizedError } from '@Commons/errors/factory/authorized.error';

const {
  SYSTEM_KEY_PUBLIC,
  SYSTEM_KEY_PRIVATE
} = process.env;

export class SessionDataValidator {

  private req: Request;
  _id: string = '';
  keyPublic: string = '';
  workSpaceId: string = '';
  microWorkSpaceId: string = '';
  email: string = '';
  private permissions: string[] = [];
  private permissionService: string[] = [];
  private sessionRead = new SessionRead()

  constructor(req:Request){
    this.req = req;
  }



  async setSession(){
    const sessionPayload = this.sessionRead.getOrFailed(this.req, SYSTEM_KEY_PRIVATE);
    const microWorkSpaceId = this.getMicroWorkSpaceId(sessionPayload.workspaces);
    const permissions = this.getMicroWorkSpacePermissions(microWorkSpaceId?.roleIds, sessionPayload?.permissions)

    this._id = sessionPayload?.id;
    this.keyPublic = sessionPayload?.keyPublic;
    this.workSpaceId = sessionPayload?.workSpaceId;
    this.microWorkSpaceId = microWorkSpaceId?.microWorkSpaceId;
    this.permissions = permissions;
    this.email = sessionPayload?.email;

    //console.log(this.permissions, this.microWorkSpaceId)
  }

  private wordSpaceValidator(){
    if (this.keyPublic !== SYSTEM_KEY_PUBLIC){
      throw new NotAuthorizedError();
    }
  }


  private getMicroWorkSpacePermissions(rolesId: any[], permissions: [{id: string, permission: string[]}]){
    try {
      // Validar que 'data' y 'idsToFind' sean arrays
      if (!Array.isArray(permissions) || !Array.isArray(rolesId)) {
        throw new Error('Invalid input: data and idsToFind must be arrays');
      }
      
      // Filtrar los elementos que tienen IDs coincidentes
      const matchingItems = permissions.filter(item => rolesId.includes(item.id));
      
      // Validar que se encontraron coincidencias y que 'permission' sea un array
      if (matchingItems.length === 0 || !matchingItems.every(item => Array.isArray(item.permission))) {
        throw new Error('No matching items found or invalid permissions format');
      }
  
      // Combinar todos los permisos en un solo array
      const combinedPermissions = matchingItems.reduce<string[]>((acc, item) => acc.concat(item.permission), []);

      return combinedPermissions;
    } catch (error) {
      // Si ocurre cualquier error, devuelve un array vacío
      console.error(error);
      return [];
    }
  }


  private getMicroWorkSpaceId(microWorkSpaces: any[]): any {
    
    const microWorkSpaceIdRequest = this.req.headers['MicroWorkSpaceId'];

    if (!microWorkSpaces || microWorkSpaces.length === 0) {
      throw new NotAuthorizedError();
    }
  
    if (!microWorkSpaceIdRequest) {
      return microWorkSpaces[0];
    }
  
    const filteredWorkSpace = microWorkSpaces.find(
      (workspace) => workspace.microWorkSpaceId === microWorkSpaceIdRequest
    );
  
    if (!filteredWorkSpace) {
      throw new NotAuthorizedError();
    }
  
    return filteredWorkSpace;
  }

  private permissionValidator(){

    const matches = findMatches(this.permissions, this.permissionService);

    if (matches.length > 0) {
      return true;
    } else {
      throw new NotAuthorizedError();
    }
  }

  async run(permissionService: string[] ){
    this.permissionService = permissionService;
    await this.setSession()
    this.permissionValidator();
    this.wordSpaceValidator()
  }
}