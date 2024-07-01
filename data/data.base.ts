import { ValidateBoolean } from "@Commons/validator/boolean.validator";
import { ValidateObjectId } from "@Commons/validator/object.id.validator";
import { ValidateRequired } from "@Commons/validator/required.validator";

export class DataBase{

  _id: string = '';
  deleted: boolean = false;
  status: boolean = false;

  getId (){
    return this._id;
  }

  setId(value: any): void {
    const name = 'id';
    ValidateRequired.validateOrFail({ value, name });
    ValidateObjectId.validateOrFail({ value, name });
    this._id = value;
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