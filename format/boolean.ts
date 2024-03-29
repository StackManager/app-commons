export function parseBoolean(value: any) {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  } else {
    return Boolean(value);
  }
}