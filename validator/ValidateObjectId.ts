
import mongoose from 'mongoose';
import { REQUESTVALIDATIONTYPE, RequestValidationError } from '..';

interface ValidationInput {
  value: any;
  name?: string;
}

export class ValidateObjectId {
  static validate(value: any): boolean {
    return mongoose.Types.ObjectId.isValid(value);
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name } = input;
    const variable = name || 'ObjectId';

    if (!this.validate(value)) {
      throw new RequestValidationError([{
        message: `${variable} is not a valid ObjectId`,
        field: variable,
        detail: `${variable} is not a valid ObjectId`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}