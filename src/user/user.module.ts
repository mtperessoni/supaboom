import { Module } from '@nestjs/common';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UserRepository } from './infra/user.repository';
import { UserController } from './presentation/user.controller';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Module({
  controllers: [UserController],
  providers: [
    UpdateUserUseCase,
    {
      provide: SupabaseClient,
      useFactory: () => {
        return createClient(
          String(process.env.SUPABASE_URL),
          String(process.env.SUPABASE_ANON_KEY),
        );
      },
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
