/**
 * Format a number to the specified number of decimal places.
 *
 * @param {number} params.number - The number to format.
 * @param {number} [params.decimals=2] - The number of decimal places to format the number (default is 2).
 * @returns {number} The formatted number.
 */
export function formatFloat(params: { number: number; decimals?: number }): number {
  const { number, decimals = 2 } = params;
  const multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
}