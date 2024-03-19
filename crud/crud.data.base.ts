import { ValidateObjectId } from "@Commons/validator/object.id.validator";
import { ValidateRequired } from "@Commons/validator/required.validator";


export abstract class DataBase{

  protected abstract nameId: string;
  private id: string | undefined = undefined;

  public set _id(value: any) {
    ValidateObjectId.validateOrFail({value, name: this.nameId});
    this.id = value;
  }

  get _id(): string {
    ValidateRequired.validateOrFail({value: this._id, name: this.nameId});
    return this.id!;
  }

}