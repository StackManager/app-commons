import { REQUESTVALIDATIONTYPE, RequestValidationError } from '../errors/types/RequestValidationError';


interface EmailValidationInput {
  value: any;
  name?: string;
}

export class ValidateEmail {
  static validate(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  static validateOrFail(input: EmailValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Email';
    
    if (typeof value !== 'string') {
      throw new RequestValidationError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: REQUESTVALIDATIONTYPE.is_value_invalid
      }]);
    }

    if (!this.validate(value)) {
      throw new RequestValidationError([{
        message: `${variable} is not a valid email`,
        field: variable,
        detail: `${variable} is not a valid email`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}