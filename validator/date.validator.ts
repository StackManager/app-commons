import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';
import moment from 'moment';


interface ValidationInput {
  value: any;
  name?: string;
}

export class ValidateDate {

  static validate(value: string | Date): boolean {
    if (typeof value === 'string') {
        // Expresión regular para verificar el formato MM-DD-YYYY
        const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])-\d{4}$/;
        return regex.test(value) && moment(value, 'MM-DD-YYYY', true).isValid();
    } else if (value instanceof Date) {
        // Convertir la fecha a formato MM-DD-YYYY y luego validarla con moment.js
        const formattedDate = moment(value).format('MM-DD-YYYY');
        return moment(formattedDate, 'MM-DD-YYYY', true).isValid();
    }
    return false;
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name} = input;
    const variable = name || 'Value';
    
    if (!this.validate(value)) {
      throw new GenericError([{
        message: `${variable} is not a valid date in MM-DD-YY format`,
        field: variable,
        detail: `${variable} is not a valid date in MM-DD-YY format`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }
}