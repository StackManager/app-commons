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
    permissions: string[];
  }

  export const ModelSessionPayloadDefault = {
    id: '',
    email: '',
    keyPublic: '',
    workSpaceId: '',
    permissions: []
  }