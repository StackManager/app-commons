import { ModelErrorBase } from '../error.base';

export class BadRequestError extends ModelErrorBase {
  statusCode = 400;

  constructor(public message: string, public code: string, error: unknown = undefined) {
    super(message, error);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, code: this.code, detail: this.detail }];
  }
}
