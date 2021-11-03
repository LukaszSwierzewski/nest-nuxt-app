import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";

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
}