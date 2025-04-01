/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { RepositoryError } from '@/shared/core/errors/repository-error';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let supabaseClient: SupabaseClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: SupabaseClient,
          useFactory: () => ({
            auth: {
              admin: {
                updateUserById: jest.fn(),
              },
            },
          }),
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    supabaseClient = module.get<SupabaseClient>(SupabaseClient);
  });

  it('should return updated data if user update is successful', async () => {
    const userId = '123';
    const updateData = {
      codename: 'newCodename',
      birthday: new Date('2000-01-01'),
      name: 'New Name',
    };
    const expectedResponse = {
      codename: 'newCodename',
      birthday: new Date('2000-01-01'),
      name: 'New Name',
    };
    const user: any = { user: {} };
    jest
      .spyOn(supabaseClient.auth.admin, 'updateUserById')
      .mockResolvedValue({ error: null, data: user });

    const result = await userRepository.updateUser(userId, updateData);
    expect(result).toEqual([expectedResponse, null]);
  });

  it('should return an error if user update fails', async () => {
    const userId = '123';
    const updateData = { codename: 'newCodename' };
    const errorMessage = 'Update failed';
    const error: any = new RepositoryError(errorMessage);
    const user: any = { user: {} };
    jest
      .spyOn(supabaseClient.auth.admin, 'updateUserById')
      .mockResolvedValue({ error, data: user });

    const result = await userRepository.updateUser(userId, updateData);
    expect(result).toEqual([null, new RepositoryError(errorMessage)]);
  });
});
