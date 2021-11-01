import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({nullable: true})
    session_id: string;
}