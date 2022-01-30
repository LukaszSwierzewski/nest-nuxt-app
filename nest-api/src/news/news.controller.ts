import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedNewsDto } from './dto/PaginatedNews.dto';
import { ComplainService } from '../complains/complains.service';
@Controller('blog')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly complainsGateway: ComplainService) {
  }

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto, @Request() req) {
    if (req.user && req.user.isAdmin) {
      const data = await this.newsService.create(createNewsDto);
      this.complainsGateway.server.emit('msgToClient', data)
      return { data, status: 'Post has been added' };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Only admin can add new posts',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('news')
  findAllPaginated(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedNewsDto> {
    paginationDto.page = Number(paginationDto.page);
    const responseBlog = this.newsService.findAllAndPaginate({
      ...paginationDto,
    });
    return responseBlog
  }
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':page_link')
  findOne(@Param('page_link') page_link: string) {
    return this.newsService.findOne(page_link);
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
