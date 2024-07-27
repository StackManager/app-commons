export function getYearMonthDay(date: Date): { year: number, month: number, day: number } {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que sumamos 1
  const day = date.getDate();

  return { year, month, day };
}