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
    console.log(createCommentDto)
    const newComment = new Comment()
    const userID = await this.usersRepository.findOneOrFail({id: createCommentDto.user_id})
    const newsID = await this.newsRepository.findOneOrFail({id: createCommentDto.news_id})
    newComment.comment_content = createCommentDto.comment_content
    newComment.author = userID
    newComment.post = newsID
    if (createCommentDto.comment_content) {
      return this.commentRepository.save(newComment);
    }
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
