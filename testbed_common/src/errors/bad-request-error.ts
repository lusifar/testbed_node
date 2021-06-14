import { CustomError } from './custom-error';

export class BadRequest extends CustomError {
  statusCode: number = 400;
  reason: string = '';

  constructor(reason: string) {
    super('[Error] Bad request');

    Object.setPrototypeOf(this, BadRequest.prototype);

    this.reason = reason;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
