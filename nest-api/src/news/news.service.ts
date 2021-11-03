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
  create(createNewsDto: CreateNewsDto) {
    const newPosts = this.newsRepository.create(createNewsDto);
    const isValidTitle = this.checkNewsTitle(createNewsDto.title);
    if (isValidTitle) {
      return this.newsRepository.save(newPosts);
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
    const news = await this.newsRepository
      .createQueryBuilder()
      .orderBy('created_at', 'DESC')
      .offset(skippedItems)
      .limit(limit)
      .getMany();
    return {
      totalCount,
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
    const oneUser = this.newsRepository.findOneOrFail({ page_link });
    return oneUser;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
