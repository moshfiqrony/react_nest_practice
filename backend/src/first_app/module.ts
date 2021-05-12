import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';

const CONTROLLERS = [AppController];
const PROVIDERS = [AppService];

@Module({
  imports: [],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class AppModule {}
