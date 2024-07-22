import { BaseModel } from '../base.model';

import { UserRoleEnum } from './user-role.enum';

export class User extends BaseModel {
  name: string;
  username?: string;
  role?: UserRoleEnum;

  constructor(user?: Partial<User>) {
    super({ ...user });
    if (user) {
      this.name = user?.name || "";
      this.username = user?.username || "";

    } else {
      this.name = "";
    }
  }
}