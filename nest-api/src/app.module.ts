import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { ComplainModule } from './complains/complains.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    NewsModule,
    CommentsModule,
    ComplainModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
