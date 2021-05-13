import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/auth/JWTAuthGuard';
import { TokenVerifyingGuard } from 'src/auth/TokenVerifyingGuard';
import { UserService } from './service';

@Controller('/api/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(TokenVerifyingGuard)
  @UseGuards(JWTAuthGuard)
  @Get()
  get(@Req() request: any) {
    return this.userService.findOneById(request.user.id);
  }
}
