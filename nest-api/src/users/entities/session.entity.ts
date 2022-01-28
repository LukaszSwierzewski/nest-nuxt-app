import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  session_cookie: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne((type) => User, (user) => user.sessions)
  session_user: User;
}
