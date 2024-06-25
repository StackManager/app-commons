import { GenericError } from "@Commons/errors/factory/generic.error";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";

interface RegexValidationInput {
  value: any;
  name?: string;
  regex: RegExp;
}

export class ValidateRegex {
  static validate(value: string, regex: RegExp): boolean {
    return regex.test(value);
  }

  static validateOrFail(input: RegexValidationInput): void {
    const { value, name, regex } = input;
    const variable = name || 'Value';
    
    if (typeof value !== 'string') {
      throw new GenericError([{
        message: `${variable} must be a string`,
        field: variable,
        detail: `${variable} must be a string`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    if (!this.validate(value, regex)) {
      throw new GenericError([{
        message: `${variable} does not match the required pattern`,
        field: variable,
        detail: `${variable} does not match the required pattern: ${regex}`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}