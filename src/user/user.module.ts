import { Module } from '@nestjs/common';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UserRepository } from './infra/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UpdateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
