import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Session } from './session.entity';
import { Comment } from '../../comments/entities/comment.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Session, (session) => session.session_user, {
    cascade: true,
  })
  sessions: Session[];
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
