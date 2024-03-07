import { ValidateRequired } from "@Commons/validator/required.validator";

export class DatabaseData {

  private _mongoUsername: string | undefined;
  private _mongoPassword: string | undefined;
  private _mongoHostname: string | undefined;
  private _mongoPort: string | undefined;
  private _mongoDB: string | undefined;

  // Setters

  set mongoUsername(value: string | undefined) {
    this._mongoUsername = value;
  }

  set mongoPassword(value: string | undefined) {
    this._mongoPassword = value;
  }

  set mongoHostname(value: string | undefined) {
    this._mongoHostname = value;
  }

  set mongoPort(value: string | undefined) {
    this._mongoPort = value;
  }

  set mongoDB(value: string | undefined) {
    this._mongoDB = value;
  }

  // Getters
  get mongoUsername(): string {
    ValidateRequired.validateOrFail({value: this._mongoUsername, name: 'mongoUsername'});
    return this._mongoUsername!;
  }

  get mongoPassword(): string {
    ValidateRequired.validateOrFail({value: this._mongoPassword, name: 'mongoPassword'});
    return this._mongoPassword!;
  }

  get mongoHostname(): string  {
    ValidateRequired.validateOrFail({value: this._mongoHostname, name: 'mongoHostname'});
    return this._mongoHostname!;
  }

  get mongoPort(): string  {
    ValidateRequired.validateOrFail({value: this._mongoPort, name: 'mongoPort'});
    return this._mongoPort!;
  }

  get mongoDB(): string  {
    ValidateRequired.validateOrFail({value: this._mongoDB, name: 'mongoDB'});
    return this._mongoDB!;
  }
}