import { Injectable } from "@nestjs/common";
import { BaseService } from "../common/service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService extends BaseService {
  constructor(private usersService: UsersService) {
    super();
  }

  async validateUser(username: string, password: string) {
    return this.usersService.validatePassword(username, password);
  }
}
