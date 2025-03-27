import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  AuthenticationResponse,
  IAuthRepository,
} from '../domain/repository/auth.repository';
import { User } from '../domain/entities/user.entity';
import { RepositoryError } from '@/shared/core/errors/repository-error';
import {
  err,
  ResponseResult,
  success,
} from '@/shared/core/response/response-result';

@Injectable()
export class AuthRepository implements IAuthRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      String(process.env.SUPABASE_URL),
      String(process.env.SUPABASE_ANON_KEY),
    );
  }

  async register(email: string, password: string): ResponseResult<User> {
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) return err(new RepositoryError(error.message));
    return success(new User(email, password));
  }

  async loginWithEmail(
    email: string,
    password: string,
  ): ResponseResult<AuthenticationResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return err(new RepositoryError(error.message));
    return success({
      id: data.user.id,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: new User(
        String(data.user.user_metadata.email),
        String(data.user.user_metadata.name),
        String(data.user.user_metadata.codename),
      ),
    });
  }
}
