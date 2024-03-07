export abstract class ModelErrorBase extends Error {
  abstract statusCode: number;
  detail: string = '';

  constructor(message: string, error: unknown) {
    super(message);
    this.errorDetail(error);
    Object.setPrototypeOf(this, ModelErrorBase.prototype);
  }

  errorDetail(error: unknown){
    if (typeof error === 'object' && error !== null && 'message' in error) {
      this.detail = error.message as string;
    }
  }

  abstract serializeErrors(): { message: string; errors?: string; detail?: string}[];
}
