import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { BaseController } from "../common/controller";

@Controller("users")
export class UsersController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }
}
