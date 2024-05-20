import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    create: Date;

    @OneToMany(() => TodoEntity, todo => todo.user)
    todos: TodoEntity[]
}