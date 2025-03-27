import { ResponseResult } from '@/shared/core/response/response-result';

export interface IUserRepository {
  updateUser(
    userId: string,
    data: UpdateUserRepositoryInput,
  ): ResponseResult<UpdateUserRepositoryOutput>;
}

export type UpdateUserRepositoryInput = {
  codename?: string;
  name?: string;
  birthday?: Date;
};

export type UpdateUserRepositoryOutput = UpdateUserRepositoryInput;
