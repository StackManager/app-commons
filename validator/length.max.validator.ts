import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';


interface ValidationInput {
  value: any;
  name?: string;
  maxLength: number;
}

export class ValidateMaxLength {
  static validate(value: string, maxLength: number): boolean {
    return value.length <= maxLength;
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name, maxLength = 255 } = input;
    const variable = name || 'Value';
    

    if (typeof value !== 'string') {
      throw new GenericError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    if (!this.validate(value, maxLength)) {
      throw new GenericError([{
        message: `${variable} exceeds the maximum length`,
        field: variable,
        detail: `${variable} exceeds the maximum length of ${maxLength} characters`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}