export function objectToQueryParams(obj: Record<string, any> | undefined): string {

  if (obj == undefined) return ""

  const queryParams = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value.toString());
        queryParams.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }

  return "?"+queryParams.join('&');
}