import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/users/service';
import { AuthService } from './service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  create(
    @Req() request: Request,
    @Query('email') email: string,
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    return this.userService.create(email, username, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
