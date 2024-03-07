import { REQUESTVALIDATIONTYPE, RequestValidationError } from "@Helpers/errors/types/RequestValidationError";

interface ValidationInput {
  value: any;
  name?: string;
}

export class ValidatePassword {
  static validate(value: string): boolean {
    const minLength = 4;
    const maxLength = 20;

    if (value.length < minLength || value.length > maxLength) {
      throw new RequestValidationError([{
        message: `Password must be between ${minLength} and ${maxLength} characters`,
        field: 'Password',
        detail: `Password must be between ${minLength} and ${maxLength} characters`,
        code: REQUESTVALIDATIONTYPE.password_betweeb_4_20
      }]);
    }

    if (!/\d/.test(value)) {
      throw new RequestValidationError([{
        message: 'Password must contain at least one digit',
        field: 'Password',
        detail: 'Password must contain at least one digit',
        code: REQUESTVALIDATIONTYPE.password_at_least_one_digit
      }]);
    }

    if (!/[a-z]/.test(value)) {
      throw new RequestValidationError([{
        message: 'Password must contain at least one lowercase letter',
        field: 'Password',
        detail: 'Password must contain at least one lowercase letter',
        code: REQUESTVALIDATIONTYPE.passwoard_at_least_lowercase
      }]);
    }

    if (!/[A-Z]/.test(value)) {
      throw new RequestValidationError([{
        message: 'Password must contain at least one uppercase letter',
        field: 'Password',
        detail: 'Password must contain at least one uppercase letter',
        code: REQUESTVALIDATIONTYPE.password_at_least_uppercase
      }]);
    }

    if (!/[!@#$%^&*]/.test(value)) {
      throw new RequestValidationError([{
        message: 'Password must contain at least one special character',
        field: 'Password',
        detail: 'Password must contain at least one special character',
        code: REQUESTVALIDATIONTYPE.password_at_least_special
      }]);
    }

    return true;
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Password';

    if (typeof value !== 'string') {
      throw new RequestValidationError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: REQUESTVALIDATIONTYPE.is_value_invalid
      }]);
    }

    this.validate(value);
  }
}