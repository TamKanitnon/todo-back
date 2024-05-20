import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column()
    status: TodoStatus;

    @Column()
    create: Date;

    @ManyToOne(() => UserEntity, user => user.todos)
    user: UserEntity;
}

export enum TodoStatus {
    open = "OPEN",
    in_progress = "IN_PROGRESS",
    completed = "COMPLETED",
}