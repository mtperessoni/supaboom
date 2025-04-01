import { Test, TestingModule } from '@nestjs/testing';
import { LoginWithEmailUseCase } from './login-with-email.use-case';
import { IAuthRepository } from '../domain/repository/auth.repository';
import { ServiceError } from '@/shared/core/errors/service-error';

describe('LoginWithEmailUseCase', () => {
  let loginWithEmailUseCase: LoginWithEmailUseCase;
  let authRepository: IAuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginWithEmailUseCase,
        {
          provide: 'IAuthRepository',
          useValue: {
            loginWithEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    loginWithEmailUseCase = module.get<LoginWithEmailUseCase>(
      LoginWithEmailUseCase,
    );
    authRepository = module.get<IAuthRepository>('IAuthRepository');
  });

  it('should return an error if login fails', async () => {
    const error = new ServiceError('Invalid credentials');
    jest
      .spyOn(authRepository, 'loginWithEmail')
      .mockResolvedValue([null, error]);
    const result = await loginWithEmailUseCase.execute(
      'test@example.com',
      'wrongPassword',
    );
    expect(result).toEqual([null, error]);
  });

  it('should return user data if login is successful', async () => {
    const userData: any = { id: 1, email: 'test@example.com' };
    jest
      .spyOn(authRepository, 'loginWithEmail')
      .mockResolvedValue([userData, null]);
    const result = await loginWithEmailUseCase.execute(
      'test@example.com',
      'ValidPassword!',
    );
    expect(result).toEqual([userData, null]);
  });
});
