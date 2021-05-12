import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('name')
export class NameController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName() {
    return this.appService.getAppName();
  }
}