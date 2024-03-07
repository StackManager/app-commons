import { GenericError } from "@Commons/errors/factory/generic.error";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";


interface ValidationInput {
  value: any;
  name?: string;
}

export class ValidatePassword {
  static validate(value: string): boolean {
    const minLength = 4;
    const maxLength = 20;

    if (value.length < minLength || value.length > maxLength) {
      throw new GenericError([{
        message: `Password must be between ${minLength} and ${maxLength} characters`,
        field: 'Password',
        detail: `Password must be between ${minLength} and ${maxLength} characters`,
        code: MODELERRORTEXTTYPE.password_betweeb_4_20
      }]);
    }

    if (!/\d/.test(value)) {
      throw new GenericError([{
        message: 'Password must contain at least one digit',
        field: 'Password',
        detail: 'Password must contain at least one digit',
        code: MODELERRORTEXTTYPE.password_at_least_one_digit
      }]);
    }

    if (!/[a-z]/.test(value)) {
      throw new GenericError([{
        message: 'Password must contain at least one lowercase letter',
        field: 'Password',
        detail: 'Password must contain at least one lowercase letter',
        code: MODELERRORTEXTTYPE.passwoard_at_least_lowercase
      }]);
    }

    if (!/[A-Z]/.test(value)) {
      throw new GenericError([{
        message: 'Password must contain at least one uppercase letter',
        field: 'Password',
        detail: 'Password must contain at least one uppercase letter',
        code: MODELERRORTEXTTYPE.password_at_least_uppercase
      }]);
    }

    if (!/[!@#$%^&*]/.test(value)) {
      throw new GenericError([{
        message: 'Password must contain at least one special character',
        field: 'Password',
        detail: 'Password must contain at least one special character',
        code: MODELERRORTEXTTYPE.password_at_least_special
      }]);
    }

    return true;
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Password';

    if (typeof value !== 'string') {
      throw new GenericError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: MODELERRORTEXTTYPE.is_value_invalid
      }]);
    }

    this.validate(value);
  }
}