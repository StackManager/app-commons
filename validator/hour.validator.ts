import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';
import moment from 'moment';


interface ValidationInput {
  value: string;
  name?: string;
}

export class ValidateTime {

  static validate(value: string): boolean {
    // Expresión regular para verificar el formato HH:mm
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(value) && moment(value, 'HH:mm', true).isValid();
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Value';
    
    if (!this.validate(value)) {
      throw new GenericError([{
        message: `${variable} is not a valid time in HH:mm format`,
        field: variable,
        detail: `${variable} is not a valid time in HH:mm format`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}