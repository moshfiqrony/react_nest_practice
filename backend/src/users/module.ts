import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';

const CONTROLLERS = [UserController];
const PROVIDERS = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: CONTROLLERS,
  providers: PROVIDERS,
})
export class UserModule {}
