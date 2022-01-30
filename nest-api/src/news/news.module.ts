import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { ComplainModule } from '../complains/complains.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), ComplainModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
