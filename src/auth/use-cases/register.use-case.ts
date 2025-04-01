import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../domain/repository/auth.repository';
import { err, ResponseResult } from '@/shared/core/response/response-result';
import { ServiceError } from '@/shared/core/errors/service-error';

export type RegiserUseCaseOutput = boolean;

@Injectable()
export class RegiserUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(
    email: string,
    password: string,
  ): ResponseResult<RegiserUseCaseOutput> {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return err(new ServiceError('Esta senha não é válida'));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, error] = await this.authRepository.register(email, password);
    if (error) return [false, error];
    return [true, null];
  }
}
