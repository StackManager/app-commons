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
  static validate<T extends Record<string, any>>(input: ValidationInput<T>): boolean {
    const { id, validOptions, key } = input;

    if (!validOptions || validOptions.length === 0) {
      return false;
    }
    input.index = -1;
    return validOptions.some(obj => {

      const attributeValue = obj[key];
      
      if (input.index !== undefined) input.index = (input.index + 1);

      if (typeof attributeValue === 'string') {
        return attributeValue.toLowerCase() === String(id).toLowerCase();
      } else if (attributeValue instanceof ObjectId) {
        return attributeValue.toString() === id;
      } else {
        return false;
      }

      
    });
  }

  static validateOrFail<T extends Record<string, any>>(input: ValidationInput<T>): void {
    const { name = 'field', validOptions } = input;

    if (!this.validate(input)) {
      const validOptionsStr = validOptions.map(opt => String(opt[input.key])).join(', ');
      throw new GenericError([{
        message: `${name} is not one of the valid options: ${validOptionsStr}`,
        field: name,
        detail: `${name} is not one of the valid options: ${validOptionsStr}`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }

  static validateOrFailAndRemove<T extends Record<string, any>>(input: ValidationInput<T>): T[] {
    const { validOptions, id, key } = input;
    const input_ = {
      ...input,
      index: -1
    }
    this.validateOrFail(input_);
    validOptions.splice(input_.index, 1);
    return validOptions;
  }
}