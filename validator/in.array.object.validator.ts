import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { ObjectId } from 'mongodb';

interface ValidationInput<T> {
  id: any;
  name: string;
  key: string;
  validOptions: T[];
  index?: number;
}

export class inArrayObject {
  static validate<T extends Record<string, any>>(input: ValidationInput<T>): {exist: boolean, index: number} {
    const { id, validOptions, key } = input;

    if (!validOptions || validOptions.length === 0) {
      return {
        exist: false,
        index: -1
      }
    }

    const index = validOptions.findIndex(obj => {
      const attributeValue = obj[key];
      if (attributeValue === null || attributeValue === undefined) {
        return false;
      }
    
      if (typeof attributeValue === 'string') {
        return attributeValue.toLowerCase() === String(id).toLowerCase();
      } else if (attributeValue instanceof ObjectId) {
        try {
          return attributeValue.toString() == id;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    });

    return {
      exist: (index > 0)? true : false,
      index: index
    }
  }

  static validateOrFail<T extends Record<string, any>>(input: ValidationInput<T>) {
    const { name = 'field', validOptions } = input;

    const element = this.validate(input)

    if (!element.exist) {
      const validOptionsStr = validOptions.map(opt => String(opt[input.key])).join(', ');
      throw new GenericError([{
        message: `${name} is not one of the valid options: ${validOptionsStr}`,
        field: name,
        detail: `${name} is not one of the valid options: ${validOptionsStr}`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    return element
  }

  // static validateOrFailAndRemove<T extends Record<string, any>>(input: ValidationInput<T>): T[] {
  //   const { validOptions, id, key } = input;
  //   const input_ = {
  //     ...input,
  //     index: -1
  //   }
  //   this.validateOrFail(input_);
  //   validOptions.splice(input_.index, 1);
  //   return validOptions;
  // }
}