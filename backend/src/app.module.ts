import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppModule as FirstAppModule} from './first_app/module'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'nestjs_orm',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // this shouldn't be used in prod
    }),
    FirstAppModule,
  ],
})
export class AppModule {}
