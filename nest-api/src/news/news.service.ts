import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { Validations } from './validation/news.validations';
import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedNewsDto } from './dto/PaginatedNews.dto';
@Injectable()
export class NewsService extends Validations {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {
    super(10);
  }
  async create(createNewsDto: CreateNewsDto) {
    const newPosts = await this.newsRepository.create(createNewsDto);
    const isValidTitle = this.checkNewsTitle(createNewsDto.title);
    if (isValidTitle) {
      const newPostsSaved = this.newsRepository.save(newPosts);
      return newPostsSaved;
    } else {
      return 'Invalid title. Title must have atleast 3 characters';
    }
  }
  async findAllAndPaginate(
    paginationDto: PaginationDto,
  ): Promise<PaginatedNewsDto> {
    console.log(this.someNumber);
    const limit = paginationDto.perPage ? paginationDto.perPage : 6;
    const skippedItems = (paginationDto.page - 1) * limit;
    const totalCount = await this.newsRepository.count();
    const maxPages = Math.ceil(totalCount / limit);
    const news = await this.newsRepository
      .createQueryBuilder()
      .orderBy('created_at', 'DESC')
      .offset(skippedItems)
      .limit(limit)
      .getMany();
    return {
      totalCount,
      maxPages,
      page: paginationDto.page,
      limit: limit,
      data: news,
    };
  }
  findAll() {
    const allNews = this.newsRepository.find();
    return allNews;
  }

  async findOne(page_link: string) {
    // const oneUser = await this.newsRepository.findOne({
    //   where: { 
    //     page_link, 
    //     comments: {
    //       'is_accepted': 1
    //     }
    //   },
    //   relations: ['comments', 'comments.author'],
    // });
    const user = await this.newsRepository.createQueryBuilder('news')
    .leftJoinAndSelect('news.comments', 'comments', 'comments.is_accepted = true')
    .leftJoinAndSelect('comments.author', 'author')
    .where('news.page_link = :page_link', {page_link})
    .getMany();
    return user[0];
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
