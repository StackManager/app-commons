import { ModelErrorBase } from '../ModelErrorBase';

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
      const code = (err as IGenericErrorProps).code  || undefined;
      const index = (err as IGenericErrorProps).index || undefined;
      const message = (err as IGenericErrorProps).message || undefined;
      const field = (err as IGenericErrorProps).field || undefined;
      const detail = this.detail || undefined;
      return { 
        message: message || '', // Ensure message is not undefined
        detail: detail ? JSON.stringify({detail, code, index, field}) : undefined, // Ensure detail is a string or undefined
      };
    });
  }

}