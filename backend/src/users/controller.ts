import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/auth/JWTAuthGurd';
import { UserService } from './service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Req() request: Request,
    @Query('email') email: string,
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    return this.userService.create(email, username, password);
  }

  @UseGuards(JWTAuthGuard)
  @Get('me')
  get(@Req() request: any) {
    return this.userService.findOneById(request.user.id);
  }
}
