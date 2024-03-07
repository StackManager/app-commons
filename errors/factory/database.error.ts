import { ModelErrorBase } from '../error.base';

export class DatabaseError extends ModelErrorBase {
  statusCode = 400;

  constructor(public message: string, public code: string, error: unknown = undefined) {
    super(message, error);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ 
      message: this.message, 
      code: this.code, 
      type:'DatabaseError', 
      detail: this.detail 
    }];
  }
}