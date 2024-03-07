
import { REQUESTVALIDATIONTYPE, RequestValidationError } from '../errors/types/RequestValidationError';
import { Document, Model } from 'mongoose';

class ValidateSchema {

  static async validateUniqueField<T extends Document>(
    model: Model<T>,
    filter: any,
    fieldName: keyof T,
    ): Promise<void> {

    let existingDoc = undefined;
    try {
      existingDoc = await model.findOne(filter);
    } catch (error) {
      throw new RequestValidationError([{
        message: `${fieldName as string} system error consulting (ValidateSchema)`,
        field: fieldName as string,
        detail: `${fieldName as string} system error consulting (ValidateSchema)`,
        code: REQUESTVALIDATIONTYPE.is_instance_no_exist
      }]);
    }
    
    if (existingDoc) {
      throw new RequestValidationError([{
        message: `${fieldName as string} is duplicated in our database`,
        field: fieldName as string,
        detail: `${fieldName as string} is duplicated in our database`,
        code: REQUESTVALIDATIONTYPE.is_value_duplicated
      }]);
    }
  }


  static async validateExistence<T extends Document>(
    model: Model<T>,
    filter: any,
    fieldName: string
  ): Promise<void> {

    try {
      const existingDoc = await model.findOne(filter);
      if (!existingDoc) {
        throw new RequestValidationError([{
          message: `${fieldName} not found`,
          field: fieldName,
          detail: `${fieldName} not found`,
          code: REQUESTVALIDATIONTYPE.is_invalid
        }]);
      }
      
    } catch (error) {
      throw new RequestValidationError([{
        message: `${fieldName} system error consulting`,
        field: fieldName,
        detail: `${fieldName} system error consulting`,
        code: REQUESTVALIDATIONTYPE.is_system_error
      }]);
    }

  }
}

export { ValidateSchema };