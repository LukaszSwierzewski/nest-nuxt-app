import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  page_link: string;
  @Column()
  title: string;
  @Column('tinytext')
  description: string;
  @Column('text')
  post_content: string;
  @Column()
  active: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];
}
