 /**
 * Interface defining the structure of a permission object used in the `getIsClientHasPermission` method.
 */
 export interface IPermissionService {
  permission: string[]; // An array of strings representing the required permissions.
  value: string; // The value associated with the permissions.
}

export interface ISession {
  id: string;
  email: string;
  langId: string;
  createdAt?: number; 
  expiresAt?: number;
  permissions?: string[];
  permissionsServices?: IPermissionService | undefined;
}


export const ModelSessionPayloadDefault = {
  id: '',
  email: '',
  langId: '',
  //permissions: [],
}