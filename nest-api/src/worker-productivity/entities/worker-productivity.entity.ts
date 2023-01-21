import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  @Entity()
  export class ProductivityOrder {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    order_id: string;
    @ManyToOne((type) => User, (user) => user.orders)
    worker: User;
  }
  