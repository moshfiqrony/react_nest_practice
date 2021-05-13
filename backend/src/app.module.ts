import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstAppModule } from './first_app/module';
import { UserModule } from './users/module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'nestjs_orm',
      entities: ['dist/**/entity{.ts,.js}'],
      synchronize: true, // this shouldn't be used in prod
    }),
    FirstAppModule,
    UserModule,
  ],
})
export class AppModule {}
