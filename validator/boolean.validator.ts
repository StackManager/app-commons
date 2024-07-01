import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';

interface BooleanValidationInput {
  value: any;
  name?: string;
}

export class ValidateBoolean {
  static validate(boolean: any): boolean {
    return typeof boolean === 'boolean' || ['true', 'false'].includes(boolean.toString().toLowerCase());
  }

  static validateOrFail(input: BooleanValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Boolean';
    
    if (typeof value !== 'boolean' && !this.validate(value)) {
      throw new GenericError([{
        message: `${variable} must be a valid boolean`,
        field: variable,
        detail: `${variable} must be a valid boolean`,
        code: MODELERRORTEXTTYPE.is_value_invalid
      }]);
    }
  }
}
