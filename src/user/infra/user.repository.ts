import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { RepositoryError } from '@/shared/core/errors/repository-error';
import { err, ResponseResult } from '@/shared/core/response/response-result';
import {
  IUserRepository,
  UpdateUserRepositoryInput,
  UpdateUserRepositoryOutput,
} from '../domain/repository/auth.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      String(process.env.SUPABASE_URL),
      String(process.env.SUPABASE_ANON_KEY),
    );
  }

  async updateUser(
    userId: string,
    data: UpdateUserRepositoryInput,
  ): ResponseResult<UpdateUserRepositoryOutput> {
    const updateData: UpdateUserRepositoryInput = {};
    if (data?.codename) updateData.codename = data.codename;
    if (data?.birthday) updateData.birthday = data.birthday;
    if (data?.name) updateData.name = data.name;

    const { error } = await this.supabase.auth.admin.updateUserById(userId, {
      user_metadata: updateData,
    });

    if (error) {
      return err(new RepositoryError(error.message));
    }

    return [updateData, null];
  }
}
