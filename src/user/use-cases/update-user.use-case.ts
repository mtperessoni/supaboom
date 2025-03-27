import { Inject, Injectable } from '@nestjs/common';
import { ResponseResult } from '@/shared/core/response/response-result';
import { IUserRepository } from '../domain/repository/auth.repository';

export type UpdateUserUseCaseInput = {
  codename?: string;
  name?: string;
  birthday?: Date;
};

export type UpdateUserUseCaseOutput = UpdateUserUseCaseInput;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    data: UpdateUserUseCaseInput,
  ): ResponseResult<UpdateUserUseCaseOutput> {
    const [success, error] = await this.userRepository.updateUser(userId, data);
    if (error) return [null, error];
    return [success, null];
  }
}
