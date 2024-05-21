import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/entities/todo.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repository: Repository<TodoEntity>) {}

    async createTodo(data: CreateTodoDto, user: UserEntity) {
        const todo = new TodoEntity();
        todo.title = data.title;
        todo.description = data.description;
        todo.status = TodoStatus.open;
        todo.create = new Date();
        todo.user = user;
        try {
            return await this.repository.save(todo);
        } catch {
            throw new InternalServerErrorException('something went wrong cannot create new todo');
        }
    }

    async getAllTodos(user: UserEntity) {
        try {
            return await this.repository.find({
                where: {
                    user: user
                },
                order: {
                    create: "DESC"
                }
            }); 
        } catch (err) { 
            throw new InternalServerErrorException('something went wrong cannot find todo')
        }
    }

    async getGroupTodos(status: TodoStatus, user: UserEntity) {
        try {
            return await this.repository.find({
                where: {
                    user: user,
                    status: status
                },
                order: {
                    create: "DESC"
                }
            }); 
        } catch (err) { 
            throw new InternalServerErrorException('something went wrong cannot find todo')
        }
    }

    async updateTodo(id: string, status: TodoStatus, user: UserEntity) {
        try {
            const checkUpdate = await this.repository.update({id, user: user}, {status});
            if (checkUpdate.affected) return await this.repository.findOne({where: {id: id}});
        } catch (err) {
            throw new InternalServerErrorException('something went wrong cannot update todo');
        }
    }

    async editTodo(id: string, data: CreateTodoDto, user: UserEntity) {
        try {
            const checkUpdate = await this.repository.update({id, user: user}, data);
            if (checkUpdate.affected) return await this.repository.findOne({where: {id: id}});
        } catch (err) {
            throw new InternalServerErrorException('something went wrong cannot update todo');
        }
    }

    async delete(id: string, user: UserEntity) {
        try {
            return await this.repository.delete({id: id, user: user});
        } catch (err) {
            throw new InternalServerErrorException('There were something went wrong');
        }
    }
}
