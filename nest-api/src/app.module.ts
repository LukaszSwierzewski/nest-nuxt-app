import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { WorkerProductivityModule } from './worker-productivity/worker-productivity.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    NewsModule,
    CommentsModule,
    WorkerProductivityModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
