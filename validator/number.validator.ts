import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';

interface NumberValidationInput {
  value: any;
  name?: string;
}

export class ValidateNumber {
  static validate(number: any): boolean {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  static validateOrFail(input: NumberValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Number';
    
    if (typeof value !== 'number' && !this.validate(value)) {
      throw new GenericError([{
        message: `${variable} must be a valid number`,
        field: variable,
        detail: `${variable} must be a valid number`,
        code: MODELERRORTEXTTYPE.is_value_invalid
      }]);
    }
  }
}