import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';
import moment from 'moment';



export class DateComparator  {

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
  
  static isDateBefore(date1: string | Date, date2: string | Date): boolean {
    if (!this.validate(date1) || !this.validate(date2)) {
      throw new GenericError([{
        message: `One or both dates are not valid in YYYY-MM-DD format`,
        field: 'dateStart',
        detail: `One or both dates are not valid in YYYY-MM-DD format`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    const isBefore = moment(date1).isBefore(date2);
    if (!isBefore) {
      throw new GenericError([{
        message: `Date '${date1}' is not before '${date2}'`,
        field: 'dateStart',
        detail: `Date '${date1}' is not before '${date2}'`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    return isBefore;
  }

  static isDateAfter(date1: string | Date, date2: string | Date): boolean {
    if (!this.validate(date1) || !this.validate(date2)) {
      throw new GenericError([{
        message: `One or both dates are not valid in YYYY-MM-DD format`,
        field: 'dateStart',
        detail: `One or both dates are not valid in YYYY-MM-DD format`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    const isAfter = moment(date1).isAfter(date2);
    if (!isAfter) {
      throw new GenericError([{
        message: `Date '${date1}' is not after '${date2}'`,
        field: 'dateStart',
        detail: `Date '${date1}' is not after '${date2}'`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    return isAfter;
  }

  static isDateEqual(date1: string | Date, date2: string | Date): boolean {
    if (!this.validate(date1) || !this.validate(date2)) {
      throw new GenericError([{
        message: `One or both dates are not valid in YYYY-MM-DD format`,
        field: 'dateStart',
        detail: `One or both dates are not valid in YYYY-MM-DD format`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    const isEqual = moment(date1).isSame(date2);
    if (!isEqual) {
      throw new GenericError([{
        message: `Date '${date1}' is not equal to '${date2}'`,
        field: 'dateStart',
        detail: `Date '${date1}' is not equal to '${date2}'`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    return isEqual;
  }

}