import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/interfaces/User';
import { AppService } from './service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll(@Req() request: Request): User[] {
    return this.appService.getAllUsers();
  }

  @Get(':id')
  get(@Req() request: Request, @Param('id') id: number): User {
    return this.appService.getUser(id);
  }

  @Post()
  create(
    @Req() request: Request,
    @Query('email') email: string,
    @Query('username') username: string,
  ): User {
    return this.appService.createUser(email, username);
  }
}
