import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedNewsDto } from './dto/PaginatedNews.dto';
@Controller('blog')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get('news')
  findAllPaginated(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedNewsDto> {
    paginationDto.page = Number(paginationDto.page);
    return this.newsService.findAllAndPaginate({
      ...paginationDto,
    });
  }
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.newsService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
