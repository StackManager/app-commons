import { Request } from 'express';
import { getPermissionsByEmailAndWorkSpaceId } from '@Authentification/models/aggregations/get.permissions.by.email.and.work.spaceId';
import { SessionRead } from '@Commons/session/read.session';
import { WorkSpaceFromHeader } from '@WorkSpace/classes/get.work.space.header';
import { findMatches } from '@Commons/functions/arrayInArray';
import { NotAuthorizedError } from '@Commons/errors/factory/authorized.error';

const {
  SYSTEM_KEY_PUBLIC
} = process.env;

export class SessionDataValidator {

  private req: Request;
  private _id: string = '';
  private keyPublic: string = '';
  private workSpaceId: string = '';
  private email: string = '';
  private permissions: string[] = [];
  private permissionService: string[] = [];
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
    this.permissions = sessionPayload?.permissions;
    this.email = sessionPayload?.email;
    console.log(this.keyPublic, this.permissions, this.email)
  }

  private wordSpaceValidator(){
    if (this.keyPublic !== SYSTEM_KEY_PUBLIC){
      throw new NotAuthorizedError();
    }

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