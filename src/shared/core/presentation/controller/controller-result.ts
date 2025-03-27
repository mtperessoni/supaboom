import { BadRequestException } from '@nestjs/common';
import { CoreResult } from '../../response/response-result';

export type TControllerResult<T> = Promise<T | null>;

export class BaseController {
  static result<T>(data: CoreResult<T>): TControllerResult<T> {
    const [result, error] = data;
    if (error) throw new BadRequestException(error.message);
    return Promise.resolve(result);
  }
}
