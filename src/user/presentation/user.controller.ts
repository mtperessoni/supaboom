import { Controller, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { BaseController } from '@/shared/core/presentation/controller/controller-result';

import { AuthGuard } from '@/shared/core/guards/auth.guard';
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput,
} from '../use-cases/update-user.use-case';
import { AuthenticatedRequest } from '@/shared/core/requests/authenticated-request';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch()
  async updateUser(
    @Body() body: UpdateUserUseCaseInput,
    @Request() request: AuthenticatedRequest,
  ) {
    const result = await this.updateUserUseCase.execute(request.user.id, body);
    return BaseController.result(result);
  }
}
