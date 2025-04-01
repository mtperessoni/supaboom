import { Test, TestingModule } from '@nestjs/testing';
import { RegiserUseCase } from './register.use-case';
import { IAuthRepository } from '../domain/repository/auth.repository';
import { ServiceError } from '@/shared/core/errors/service-error';

describe('RegiserUseCase', () => {
  let regiserUseCase: RegiserUseCase;
  let authRepository: IAuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegiserUseCase,
        {
          provide: 'IAuthRepository',
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    regiserUseCase = module.get<RegiserUseCase>(RegiserUseCase);
    authRepository = module.get<IAuthRepository>('IAuthRepository');
  });

  it('should return an error if the password is invalid', async () => {
    const result = await regiserUseCase.execute('test@example.com', 'invalid');
    expect(result[1]).toBeInstanceOf(ServiceError);
    expect(result[1]?.message).toBe('Esta senha não é válida');
  });

  it('should call authRepository.register with correct parameters', async () => {
    const registerMock = jest
      .spyOn(authRepository, 'register')
      .mockResolvedValue([null, null]);
    await regiserUseCase.execute('test@example.com', 'Valid1Password!');
    expect(registerMock).toHaveBeenCalledWith(
      'test@example.com',
      'Valid1Password!',
    );
  });

  it('should return false and an error if registration fails', async () => {
    const error = new Error('Registration failed');
    jest.spyOn(authRepository, 'register').mockResolvedValue([null, error]);
    const result = await regiserUseCase.execute(
      'test@example.com',
      'Valid1Password!',
    );
    expect(result).toEqual([false, error]);
  });

  it('should return true if registration is successful', async () => {
    jest.spyOn(authRepository, 'register').mockResolvedValue([null, null]);
    const result = await regiserUseCase.execute(
      'test@example.com',
      'Valid1Password!',
    );
    expect(result).toEqual([true, null]);
  });
});
