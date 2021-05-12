import { Controller, Get } from '@nestjs/common';
import { AppService } from '../first_app/service';

@Controller('name')
export class NameController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName() {
    return this.appService.getAppName();
  }
}