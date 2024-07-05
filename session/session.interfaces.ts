 /**
 * Interface defining the structure of a permission object used in the `getIsClientHasPermission` method.
 */
  export interface GetSessionPermission {
    permissionSession: string[];
  }

  export interface ISession {
    id: string;
    email: string;
    keyPublic: string;
    workSpaceId: string;
  }

  export const ModelSessionPayloadDefault = {
    id: '',
    email: '',
    keyPublic: '',
    workSpaceId: ''
  }

      // langId: string;
    // createdAt?: number; 
    // expiresAt?: number;
    // permissions?: string[];
    // permissionsServices?: IPermissionService | undefined;