import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationResponse,
  IAuthRepository,
} from '../domain/repository/auth.repository';
import { ResponseResult } from '@/shared/core/response/response-result';

@Injectable()
export class LoginWithEmailUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(
    email: string,
    password: string,
  ): ResponseResult<AuthenticationResponse> {
    const [data, error] = await this.authRepository.loginWithEmail(
      email,
      password,
    );
    if (error) return [null, error];
    return [data, null];
  }
}
