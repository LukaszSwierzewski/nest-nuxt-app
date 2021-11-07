import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { News } from '../news/entities/news.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, News])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
