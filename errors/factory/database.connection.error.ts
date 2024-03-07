import { ModelErrorBase } from '../error.base';

export class DatabaseConnectionError extends ModelErrorBase {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor(error: unknown = undefined) {
    super('Error connecting to db', error);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason, detail: this.detail }];
  }
}
