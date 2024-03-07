import { REQUESTVALIDATIONTYPE, RequestValidationError } from "@Helpers/errors/types/RequestValidationError";


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
      throw new RequestValidationError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }

    if (!this.validate(value, minLength)) {
      throw new RequestValidationError([{
        message: `${variable} does not meet the minimum length requirement`,
        field: variable,
        detail: `${variable} does not meet the minimum length requirement of ${minLength} characters`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}