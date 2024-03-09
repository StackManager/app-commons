import { Request} from 'express';
import { SessionRead } from './read.session';
import { ISession } from './session.interfaces';


export class ControllerSession{


  static get(req: Request): ISession{
    
    const sessionRead = new SessionRead()
    const sessionPayload = sessionRead.getOrFailed(req);
  
    return sessionPayload;
  }

}