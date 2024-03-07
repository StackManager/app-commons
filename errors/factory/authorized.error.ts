import { ModelErrorBase } from '../error.base';

export class NotAuthorizedError extends ModelErrorBase {
  statusCode = 401;

  constructor(error: unknown = undefined) {
    super('Not Authorized', error);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ 
      message: 'Not authorized', 
      detail: this.detail 
    }];
  }
}