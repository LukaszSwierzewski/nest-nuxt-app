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
    super();
  }
  async create(createNewsDto: CreateNewsDto) {
    const newPosts = await this.newsRepository.create(createNewsDto);
    const isValidTitle = this.checkNewsTitle(createNewsDto.title);
    if (isValidTitle) {
      const newPostsSaved = this.newsRepository.save(newPosts);
      return newPostsSaved
    } else {
      return 'Invalid title. Title must have atleast 3 characters';
    }
  }
  async findAllAndPaginate(
    paginationDto: PaginationDto,
  ): Promise<PaginatedNewsDto> {
    const limit = 6;
    const skippedItems = (paginationDto.page - 1) * limit;
    const totalCount = await this.newsRepository.count();
    const maxPages = Math.ceil(totalCount/limit)
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

  findOne(page_link: string) {
    const oneUser = this.newsRepository.findOneOrFail({ page_link }, {
      relations: ['comments', 'comments.author'],
    });
    return oneUser;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
