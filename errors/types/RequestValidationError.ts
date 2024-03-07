import { ValidationError } from 'express-validator';
import { ModelErrorBase } from '../ModelErrorBase';

export interface MyValidationError {
  message: string;
  field: string;
  detail: string;
  index?: string;
  code?: string;
}

export class RequestValidationError extends ModelErrorBase {
  statusCode = 400;

  constructor(public errors: (ValidationError | MyValidationError)[], error: unknown = undefined) {
    super('Invalid request parameters', error);

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      const code = (err as MyValidationError).code  || undefined;
      const index = (err as MyValidationError).index || undefined;
      const message = (err as MyValidationError).message || (err as ValidationError).msg || undefined;
      const field = (err as MyValidationError).field || (err as ValidationError).param || undefined;
      const detail = this.detail || undefined;
      return { message, field, detail, index, code};
    });
  }
}
export class RequestValidationField {
  
  static errors: any[] = [];

  static throw(name: string, message: string, code?: string){

    const error = {
      message: message,
      field: name,
      detail: "Field is not valid"+ name,
      code: code || ''
    }

    throw new RequestValidationError([error]);

  }

  static addError(name: string, message: string, code?: string) {
    this.errors.push({
      message: message,
      field: name,
      detail: "Field is not valid" + name,
      code: code || ''
    });
  }

  static sendErrors() {
    if (this.errors.length > 0) {
      const errors = this.errors;
      this.errors = [];
      throw new RequestValidationError(errors);
    }
  }
}

export const REQUESTVALIDATIONTYPE = {
  is_required: 'is_required_value',
  is_invalid: 'is_invalid',
  is_required_min_value: 'is_required_min_value',
  is_required_max_value: 'is_required_max_value',
  is_format_regex_invalid: 'is_format_regex_invalid',
  is_integer_invalid: 'is_integer_invalid',
  is_min_value_invalid: 'is_min_value_invalid',
  is_max_value_invalid: 'is_max_value_invalid',
  is_id_value_invalid: 'is_id_value_invalid',
  is_boolean_invalid: 'is_boolean_invalid',
  is_hexadecimal_invalid: 'is_hexadecimal_invalid',
  is_float_invalid: 'is_float_invalid',
  is_range_invalid: 'is_range_invalid',
  is_range_must_be_after: 'is_range_must_be_after',
  is_range_must_be_before: 'is_range_must_be_before',
  is_date_format_invalid: 'is_date_format_invalid',
  is_date_invalid: 'is_date_invalid',
  is_date_must_earlier: "is_date_must_earlier",
  is_instance_no_exist: 'is_instance_no_exist',
  is_value_no_exist: 'is_value_no_exist',
  is_role_invalid: 'is_role_invalid',
  is_duplicated_value:'is_duplicated_value',
  is_value_duplicated: "is_value_duplicated",
  is_system_error: "is_system_error",
  is_value_invalid:"is_value_invalid",
  password_betweeb_4_20:'password_betweeb_4_20',
  password_at_least_one_digit:'password_at_least_one_digit',
  passwoard_at_least_lowercase:'passwoard_at_least_lowercase',
  password_at_least_uppercase:'password_at_least_uppercase',
  password_at_least_special:'password_at_least_special',
  password_required_reset: 'password_required_reset',
  is_association_invalid: 'is_association_invalid',
  is_association_active_instance:'is_association_active_instance',
  is_system_type_duplicated: 'is_system_type_duplicated',
  is_instance_inactive: 'is_instance_inactive',
  is_payment_pending: 'is_payment_pending',
  is_payment_invalid: 'is_payment_invalid',
  is_update_failed: 'is_update_failed',
  exoneration_cannot_exceed_total_cost: 'exoneration_cannot_exceed_total_cost',
  invalid_period_selection: 'invalid_period_selection',
  invalid_subscription_state: 'invalid_subscription_state',
  invalid_payment_status: 'invalid_payment_status',
  is_required_almost_one: 'is_required_almost_one',
  is_permission_priority: 'is_permission_priority'

}