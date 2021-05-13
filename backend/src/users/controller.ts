import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Req() request: Request,
    @Query('email') email: string,
    @Query('username') username: string,
  ) {
    return this.userService.create(email, username);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  get(@Req() request: Request, @Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
