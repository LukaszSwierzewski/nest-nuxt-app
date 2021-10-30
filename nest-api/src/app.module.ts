import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from '../ormconfig'
import { User } from './users/user.entity'
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
