import { Injectable } from "@nestjs/common";
import { BaseService } from "../common/service";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService extends BaseService {
  constructor(@InjectModel(User) private userModel: typeof User) {
    super();
  }

  async create(user) {
    const SALT_ROUND = 10;
    user.password = await bcrypt.hash(user.password, SALT_ROUND);
    return this.userModel.create(user);
  }

  async getByPk(userNo) {
    return this.userModel.findByPk(userNo);
  }

  async validatePassword(username: string, password: string) {
    const user = await this.getByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  }

  async getByUsername(username: string) {
    return this.userModel.findOne({
      rejectOnEmpty: false,
      where: {
        username: username,
      },
    });
  }
}
