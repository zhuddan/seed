import type { UserModel } from '@/model/user';

export interface UserState {
  user: UserModel | null;
  roles: string[];
  permissions: string[];
}
