import moment from "moment"
import { DateFormat, momentFormat } from "@Commons/constants/constants"
 
export class DateMoment {

  /**
   * 
   * @param value 
   * @returns 
   */
  static parseDate(value: string | null, format = momentFormat): moment.Moment | null {

    if (value === null) return null;
    const parsedDate = moment(value, format, true);

    if (!parsedDate.isValid()) {
      throw new Error("date format invalid");
    } 

    return parsedDate;
  }

  /**
   * 
   * @param date 
   * @returns 
   */
  static formatDate(date: moment.Moment | string, format = momentFormat){

    const momentDate = typeof date === 'string' ? this.parseDate(date, format) : date;
    return momentDate;
  }

  /**
   * 
   * @param dateStart 
   * @param dateEnd 
   * @returns 
   */
  static compareDates(dateStart: moment.Moment | string, dateEnd: moment.Moment | string, format = momentFormat): boolean {

    const momentDate1 = DateMoment.formatDate(dateStart, format);
    const momentDate2 = DateMoment.formatDate(dateEnd, format);
    if (momentDate1 == null || momentDate2 == null) { return false; }
    return momentDate1.isSameOrAfter(momentDate2);
    
  }

  /**
   * 
   * @param dateStart 
   * @param dateEnd 
   * @returns 
   */
  static getDaysDiff(dateStart: moment.Moment | string , dateEnd: moment.Moment | string ): number {
    const momentDate1 = DateMoment.formatDate(dateStart);
    const momentDate2 = DateMoment.formatDate(dateEnd);

    if (!momentDate1 || !momentDate2 || momentDate1.isAfter(momentDate2)) {
      return 0;
    }

    const startOfDay = momentDate1.startOf('day');
    const endOfDay = momentDate2.endOf('day');
    return endOfDay.diff(startOfDay, 'days') + 1;
  }


  /**
   * 
   * @returns 
   */
  static getCurrentDate() {
    const date = new Date();
  
    // Get date components
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
  
    // Format components to two digits if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;
  
    // Create the string with the format dd/mm/yy
    return this.parseDate(`${formattedMonth}/${formattedDay}/${formattedYear}`);
  }


  static subtractYears(currentDate: Date, yearsToSubtract: number, format: DateFormat): string {
    const newDate = moment(currentDate).subtract(yearsToSubtract, 'years');
    return newDate.format(format);
  }

  static addDays(date: string, daysToAdd: number, format: DateFormat): moment.Moment {

    const originalDate = DateMoment.parseDate(date, format);

    // Verificar si la fecha original es válida
    if (originalDate && originalDate.isValid()) {
        // Clonar la fecha original para no modificarla directamente
        const modifiedDate = originalDate.clone();

        // Añadir días a la fecha clonada
        modifiedDate.add(daysToAdd, 'days');

        // Devolver la nueva fecha modificada
        return modifiedDate;
    } else {
      throw new Error("date format invalid");
    }
}

}