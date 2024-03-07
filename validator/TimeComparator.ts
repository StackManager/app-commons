import moment from 'moment';
import { REQUESTVALIDATIONTYPE, RequestValidationError } from '../errors/types/RequestValidationError';

export class TimeComparator {
  
  static isTimeValid(time: string): boolean {
    const regex = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time) && moment(time, 'HH:mm', true).isValid();
  }

  static isTimeLessThan(time1: string, time2: string): boolean {
    if (!this.isTimeValid(time1) || !this.isTimeValid(time2)) {
      throw new RequestValidationError([{
        message: `One or both times are not valid in HH:mm format`,
        field: 'hourStart',
        detail: `One or both times are not valid in HH:mm format`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
    if (moment(time1, 'HH:mm').isBefore(moment(time2, 'HH:mm'))) {
      return true;
    } else {
      throw new RequestValidationError([{
        message: `Time '${time1}' is not less than '${time2}'`,
        field: 'hourStart',
        detail: `Time '${time1}' is not less than '${time2}'`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }

  static isTimeGreaterThan(time1: string, time2: string): boolean {
    if (!this.isTimeValid(time1) || !this.isTimeValid(time2)) {
      throw new RequestValidationError([{
        message: `One or both times are not valid in HH:mm format`,
        field: 'hourStart',
        detail: `One or both times are not valid in HH:mm format`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
    if (moment(time1, 'HH:mm').isAfter(moment(time2, 'HH:mm'))) {
      return true;
    } else {
      throw new RequestValidationError([{
        message: `Time '${time1}' is not greater than '${time2}'`,
        field: 'hourStart',
        detail: `Time '${time1}' is not greater than '${time2}'`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }

  static isTimeEqual(time1: string, time2: string): boolean {
    if (!this.isTimeValid(time1) || !this.isTimeValid(time2)) {
      throw new RequestValidationError([{
        message: `One or both times are not valid in HH:mm format`,
        field: 'hourStart',
        detail: `One or both times are not valid in HH:mm format`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
    if (moment(time1, 'HH:mm').isSame(moment(time2, 'HH:mm'))) {
      return true;
    } else {
      throw new RequestValidationError([{
        message: `Time '${time1}' is not equal to '${time2}'`,
        field: 'hourStart',
        detail: `Time '${time1}' is not equal to '${time2}'`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}