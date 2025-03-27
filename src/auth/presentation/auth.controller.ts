import { Controller, Post, Body } from '@nestjs/common';
import { LoginWithEmailUseCase } from '../use-cases/login-with-email.use-case';
import {
  BaseController,
  TControllerResult,
} from '@/shared/core/presentation/controller/controller-result';
import {
  RegiserUseCase,
  RegiserUseCaseOutput,
} from '../use-cases/register.use-case';
import { AuthenticationResponse } from '../domain/repository/auth.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,
    private readonly regiserUseCase: RegiserUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
  ): TControllerResult<RegiserUseCaseOutput> {
    const result = await this.regiserUseCase.execute(body.email, body.password);
    return BaseController.result(result);
  }

  @Post('login')
  async loginWithEmail(
    @Body() body: { email: string; password: string },
  ): TControllerResult<AuthenticationResponse> {
    const result = await this.loginWithEmailUseCase.execute(
      body.email,
      body.password,
    );
    return BaseController.result(result);
  }
}
