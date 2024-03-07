import { ModelErrorBase } from '../error.base';

export class NotFoundError extends ModelErrorBase {
  statusCode = 404;

  constructor(error: unknown = undefined) {
    super('Route not found', error);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ 
      message: 'Not Found', 
      detail: this.detail 
    }];
  }
}
