import { GenericError } from "@Commons/errors/factory/generic.error";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";


interface ValidationInput {
  value: any;
  name?: string;
  minLength: number;
}

export class ValidateMinLength {
  static validate(value: string, minLength: number): boolean {
    return value.length >= minLength;
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name, minLength = 0 } = input;
    const variable = name || 'Value';
    

    if (typeof value !== 'string') {
      throw new GenericError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    if (!this.validate(value, minLength)) {
      throw new GenericError([{
        message: `${variable} does not meet the minimum length requirement`,
        field: variable,
        detail: `${variable} does not meet the minimum length requirement of ${minLength} characters`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}