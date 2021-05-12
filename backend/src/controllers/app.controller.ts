import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id/:id1?')
  getHello(@Req() request: Request, @Param() params: number) {
    return this.appService.getHello(params);
  }
}
