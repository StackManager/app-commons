import { ValidateBoolean } from "@Commons/validator/boolean.validator";
import { ValidateObjectId } from "@Commons/validator/object.id.validator";
import { ValidateRequired } from "@Commons/validator/required.validator";
import {Schema} from 'mongoose';

export class DataBase{

  _id: Schema.Types.ObjectId | undefined
  deleted: boolean = false;
  status: boolean = false;

  getId (): Schema.Types.ObjectId {
    return this._id!;
  }

  setId(value: any): void {
    const name = 'id';
    ValidateRequired.validateOrFail({ value, name });
    ValidateObjectId.validateOrFail({ value, name });
    this._id =  new Schema.Types.ObjectId(value);
  }

  getStatus (){
    return this.status;
  }

  setStatus(value: any): void {
    const name = 'status';
    ValidateRequired.validateOrFail({ value, name });
    ValidateBoolean.validateOrFail({ value, name });
    this.status = value;
  }

  getDeleted(){
    return this.deleted;
  }

  setDeleted(value: any): void {
    const name = 'deleted';
    ValidateRequired.validateOrFail({ value, name });
    ValidateBoolean.validateOrFail({ value, name });
    this.deleted = value;
  }

}