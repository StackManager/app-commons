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
  email: string = '';
  private permissions: string[] = [];
  private permissionService: string[] = [];
  private sessionRead = new SessionRead()

  constructor(req:Request){
    this.req = req;
  }

  async setSession(){
    const sessionPayload = this.sessionRead.getOrFailed(this.req, SYSTEM_KEY_PRIVATE);
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