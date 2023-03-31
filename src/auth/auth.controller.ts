import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { BaseController } from "../common/controller";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards";
import CustomError from "../common/custom.error";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }

  @Post("/register")
  async create(@Body() user: RegisterDto) {
    return this.usersService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Req() req, @Body() user: LoginDto) {
    return req.user;
  }

  @Get("/me")
  async getLoginUser(@Req() req) {
    if (!req.user) {
      throw new CustomError(HttpStatus.UNAUTHORIZED, "Not Logged In", "Please log in first.");
    }

    return req.user;
  }
}
