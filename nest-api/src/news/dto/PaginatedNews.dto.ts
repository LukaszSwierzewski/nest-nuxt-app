import { News } from "../entities/news.entity";

export class PaginatedNewsDto {
  data: News[]
  page: number
  limit: number
  totalCount: number
}