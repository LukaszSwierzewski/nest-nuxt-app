import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { News } from '../../news/entities/news.entity'
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;  
  @Column()
  is_accepted: boolean;
  @Column()
  comment_content: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne((type) => User, (user) => user.comments)
  author: User;
  @ManyToOne((type) => News, (news) => news.comments)
  post: News;
}
