import { momentFormat } from "@Commons/constants/constants";


const moment = require('moment');



export function daysFromToday(daysToAdd: number): string {
  const today = moment(); // Fecha actual
  const resultDate = today.add(daysToAdd, 'days'); // Sumar o restar días

  return resultDate.format('YYYY-MM-DD'); // Devolver la fecha resultante en formato YYYY-MM-DD
}


export function isDateGreaterThanToday(dateString: string): boolean {
  // Parse the input date string using moment.js
  const inputDate = moment(dateString, momentFormat, true);

  // Check if the parsed date is valid
  if (!inputDate.isValid()) {
    throw new Error(`Invalid date`);
    //RequestValidationField.throw("date", `The date is not valid`, REQUESTVALIDATIONTYPE.is_date_format_invalid);
  }

  // Get the current date
  const currentDate = moment();

  // Compare the input date with the current date
  return inputDate.isAfter(currentDate);
}
