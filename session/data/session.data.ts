import { Request } from 'express';
import { SessionRead } from '../read.session';
import { getPermissionsByEmailAndWorkSpaceId } from '@Authentification/models/aggregations/get.permissions.by.email.and.work.spaceId';
import { NotAuthorizedError } from '@Commons/errors/factory/authorized.error';
import { WorkSpaceFromHeader } from '@WorkSpace/classes/get.work.space.header';
import { findMatches } from '@Commons/functions/arrayInArray';

export class SessionData {

  private req: Request;
  private _id?: string = undefined;
  private keyPublic?: string = undefined;
  private workSpaceId?: string = undefined;
  private permissionService: string[] = [];
  private permissionSession: string[] = [];
  private sessionRead = new SessionRead()
  private workSpaceFromHeader  = new WorkSpaceFromHeader()

  constructor(req:Request){
    this.req = req;
  }

  async setSession(){
    const workDoc = await this.workSpaceFromHeader.getWorkSpace(this.req)
    const sessionPayload = this.sessionRead.getOrFailed(this.req, workDoc.keySecret);
    this._id = sessionPayload?.id;
    this.keyPublic = sessionPayload?.keyPublic;
    this.workSpaceId = sessionPayload?.workSpaceId;

  }

  async validatePermission(){

    if (this.permissionService.length > 0 && this.workSpaceId == undefined) throw new NotAuthorizedError("Session WorkSpaceId is missing"); 
    if (this.permissionService.length > 0 && this._id == undefined) throw new NotAuthorizedError("Session authentification is missing");
    if (this.permissionService.length == 0) return

    //TODO: Crear un redis para actualizar cada minuto o 5 mins
    const userPermissions = await getPermissionsByEmailAndWorkSpaceId({
      _id: this._id!,
      workSpaceId: this.workSpaceId!
    })
    console.log(userPermissions, this.permissionService)
    this.getSessionPermission(userPermissions.permissions)
  }

  private getSessionPermission(permissionSession: string[] ){
    this.permissionSession = permissionSession || [];

    const matches = findMatches(this.permissionSession, this.permissionService);

    if (matches.length > 0) {
      return true;
    } else {
      throw new NotAuthorizedError("Invalid Permissions");
    }
  }

  async run(permissionService: string[] ){
    this.permissionService = permissionService;
    await this.setSession()
    await this.validatePermission();
  }
}