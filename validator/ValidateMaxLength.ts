import { REQUESTVALIDATIONTYPE, RequestValidationError } from '../errors/types/RequestValidationError';

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
      throw new RequestValidationError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }

    if (!this.validate(value, maxLength)) {
      throw new RequestValidationError([{
        message: `${variable} exceeds the maximum length`,
        field: variable,
        detail: `${variable} exceeds the maximum length of ${maxLength} characters`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}