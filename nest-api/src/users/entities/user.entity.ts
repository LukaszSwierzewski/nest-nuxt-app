import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Session } from './session.entity';
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
  @OneToMany((type) => Session, (session) => session.session_cookie, {
    cascade: true
  })
  sessions: Session[];
}
