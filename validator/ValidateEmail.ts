import { GenericError } from '@Commons/errors/Factory/GenericError';
import { MODELERRORTEXTTYPE } from '@Commons/errors/ModelErrorConfig';



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
      throw new GenericError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: MODELERRORTEXTTYPE.is_value_invalid
      }]);
    }

    if (!this.validate(value)) {
      throw new GenericError([{
        message: `${variable} is not a valid email`,
        field: variable,
        detail: `${variable} is not a valid email`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}