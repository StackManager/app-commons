import { ObjectId } from 'mongodb';

export function toSingleLine(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}


export const convertToString = (input: any): string => {
  if (typeof input === "string") {
    return input; 
  } else if (typeof input === "number" || input instanceof ObjectId) {
    return input.toString();
  } else {
    throw new Error("Invalid input type");
  }
}


