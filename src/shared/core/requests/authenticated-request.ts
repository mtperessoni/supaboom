import { Request } from 'express';

export interface AuthUser {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  phone: string;
  app_metadata: { [key: string]: any };
  user_metadata: { [key: string]: any };
  role: string;
  aal: string;
  amr: Array<{
    method: string;
    timestamp: number;
  }>;
  session_id: string;
  is_anonymous: boolean;
}

export class LoggedUser {
  email: string;
  codename?: string;
  name?: string;
  birthday?: Date;
  id: string;
}
export interface AuthenticatedRequest extends Request {
  user: LoggedUser;
}
