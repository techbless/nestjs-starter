import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.model";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function): any {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    const searchedUser = await this.usersService.getByPk(user.userNo);
    return searchedUser ? done(null, searchedUser) : done(null, null);
  }
}
