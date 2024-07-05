export const findMatches = (array1: string[], array2: string[]): string[] => {
  return array1.filter(item => array2.includes(item));
}