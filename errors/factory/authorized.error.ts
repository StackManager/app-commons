import { ModelErrorBase } from '../error.base';

export class NotAuthorizedError extends ModelErrorBase {
  statusCode = 401;
  myDetail: string | undefined = ''
  constructor(error: string | undefined = undefined) {
    super('Not Authorized', error);
    this.myDetail = error
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ 
      message: 'Not authorized', 
      detail: this.myDetail
    }];
  }
}