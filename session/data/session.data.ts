//Validators
import { ValidateObjectId } from '@Commons/validator/object.id.validator';
import { ValidateRequired } from '@Commons/validator/required.validator';
import { ISession } from '../session.interfaces';
import { ControllerSession } from '@Commons/session/controller.session';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export class SessionData {

  private req: Request;
  private _id?: string | undefined = undefined;

  constructor(req:Request){
    this.req = req;
  }

  run(){
    const data: ISession = ControllerSession.get(this.req);
    this.id = data.id;
    data.langId;
    data.permissions;
    data.expiresAt;
    data.email;
    data.createdAt;
  }

  set id(value: any) {
    ValidateObjectId.validateOrFail({value, name: 'sessionId'});
    this._id = value;
  }

  get id() {
    ValidateRequired.validateOrFail({value: this._id, name: 'sessionId'});
    return new Types.ObjectId(this._id!);
  }

}