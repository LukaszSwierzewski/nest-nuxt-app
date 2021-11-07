import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { News } from '../news/entities/news.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment = new Comment()
    const userID = await this.usersRepository.findOneOrFail({id: 38})
    const newsID = await this.newsRepository.findOneOrFail({id: 4})
    newComment.comment_content = 'test'
    newComment.author = userID
    newComment.post = newsID
    return this.commentRepository.save(newComment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
