import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { BaseController } from "../common/controller";
import { UsersService } from "../users/users.service";
import { AuthenticatedGuard, LocalAuthGuard } from "./guards";
import CustomError from "../common/custom.error";
import { LoginDto, LoginResponseDto, MeResponseDto, RegisterDto, RegisterResponseDto } from "./dto/auth.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }

  @ApiOperation({ summary: "Sign up as a user" })
  @ApiResponse({ type: RegisterResponseDto })
  @Post("/register")
  async create(@Body() user: RegisterDto) {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: "Sign in" })
  @ApiResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Req() req, @Body() user: LoginDto) {
    return req.user;
  }

  @ApiOperation({ summary: "logout" })
  @ApiResponse({ type: Boolean })
  @Get("/logout")
  async logout(@Req() req, @Res() res) {
    if (!req.isAuthenticated()) {
      res.json(false);
      return;
    }

    req.logout(err => {
      if (err) {
        res.json(false);
      } else {
        res.json(true);
      }
    });
  }

  @ApiResponse({ type: MeResponseDto })
  @ApiOperation({ summary: "Get the user logged in to the current session" })
  @UseGuards(AuthenticatedGuard)
  @Get("/me")
  async getLoginUser(@Req() req) {
    return req.user;
  }
}
