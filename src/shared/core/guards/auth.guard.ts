import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, LoggedUser } from '../requests/authenticated-request';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<AuthUser>(token, {
        secret: process.env.JWT_SECRET || '',
      });
      const loggedUser: LoggedUser = {
        birthday: (payload.user_metadata?.birthday as Date) || undefined,
        codename: (payload.user_metadata?.codename as string) || undefined,
        name: (payload.user_metadata?.name as string) || undefined,
        email: payload.email || '',
        id: payload.sub,
      };
      request['user'] = loggedUser;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
