import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { NameController } from './controllers/user.controller';
import { AppService } from './services/app.service';

const CONTROLLERS = [AppController, NameController];
const PROVIDERS = [AppService];

@Module({
  imports: [],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class AppModule {}
