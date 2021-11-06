import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  session_cookie: string;
  @Column()
  user_id: number;
  @ManyToOne((type) => User, (user) => user.sessions)
  session_user: User;
}
