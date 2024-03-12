import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';
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
      throw new GenericError([{
        message: `${fieldName as string} system error consulting (ValidateSchema)`,
        field: fieldName as string,
        detail: `${fieldName as string} system error consulting (ValidateSchema)`,
        code: MODELERRORTEXTTYPE.is_instance_no_exist
      }]);
    }
    
    if (existingDoc) {
      throw new GenericError([{
        message: `${fieldName as string} is duplicated in our database`,
        field: fieldName as string,
        detail: `${fieldName as string} is duplicated in our database`,
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }
  }


  static async validateExistence<T extends Document>(
    model: Model<T>,
    filter: any,
    fieldName: string
  ): Promise<void> {

    try {
      
      const doc = await model.findOne(filter);

      if (doc === null) {
        console.log("entro al null")
        throw new GenericError([{
          message: `${fieldName} not found`,
          field: fieldName,
          detail: `${fieldName} not found`,
          code: MODELERRORTEXTTYPE.is_invalid
        }]);
      }
      
    } catch (error) {
      console.log(error);
      throw new GenericError([{
        message: `${fieldName} not found`,
        field: fieldName,
        detail: `${fieldName} not found`,
        code: MODELERRORTEXTTYPE.is_system_error
      }]);
    }

  }
}

export { ValidateSchema };