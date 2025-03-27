import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthRepository } from './infra/auth.repository';
import { LoginWithEmailUseCase } from './use-cases/login-with-email.use-case';
import { RegiserUseCase } from './use-cases/register.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    LoginWithEmailUseCase,
    RegiserUseCase,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule {}
