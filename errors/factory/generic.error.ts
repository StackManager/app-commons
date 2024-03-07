import { ModelErrorBase } from '../error.base';

export interface IGenericErrorProps {
  message: string;
  field: string;
  detail: string;
  index?: string;
  code?: string;
}

export class GenericError extends ModelErrorBase {
  statusCode = 400;

  constructor(public errors: (IGenericErrorProps)[], error: unknown = undefined) {
    super('Invalid request parameters', error);

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, GenericError.prototype);
  }

  serializeErrors(): { message: string; errors?: string | undefined; detail?: string | undefined; }[] {
    return this.errors.map((err) => {
      const code = (err as IGenericErrorProps).code  || '';
      const index = (err as IGenericErrorProps).index || '';
      const message = (err as IGenericErrorProps).message || '';
      const field = (err as IGenericErrorProps).field || '';
      const detail = this.detail || '';
      return { 
        message: message || '',
        code,
        index,
        field,
        detail
      };
    });
  }

}