import { ResponseResult } from '@/shared/core/response/response-result';
import { User } from '../entities/user.entity';

export interface IAuthRepository {
  register(email: string, password: string): ResponseResult<User>;
  loginWithEmail(
    email: string,
    password: string,
  ): ResponseResult<AuthenticationResponse>;
}

export interface AuthenticationResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}
