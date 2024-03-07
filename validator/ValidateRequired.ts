import { GenericError } from "@Commons/errors/Factory/GenericError";
import { MODELERRORTEXTTYPE } from "@Commons/errors/ModelErrorConfig";

interface ValidationInput {
  value: any;
  name?: string;
}

export class ValidateRequired {
  static validate(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name } = input;
    const variable = name || 'Value';
    
    if (!this.validate(value)) {
      throw new GenericError([{
        message: `${variable} is required`,
        field: variable,
        detail: `${variable} is required`,
        code: MODELERRORTEXTTYPE.is_value_no_exist
      }]);
    }
  }
}