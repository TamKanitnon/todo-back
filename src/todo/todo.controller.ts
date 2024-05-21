import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodoService } from './todo.service';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TodoStatus } from 'src/entities/todo.entity';
import { StatusValidation } from 'src/pipes/status.validation';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

    constructor(private todoService: TodoService) {}

    @Post()
    createNewTodo(@Body() data: CreateTodoDto, @User() user: UserEntity) {
        return this.todoService.createTodo(data, user);
    }

    @Get()
    getAllTodos(@User() user: UserEntity) {
        return this.todoService.getAllTodos(user);
    }

    @Get('group')
    getGroupTodos(@Query('status', StatusValidation) status: TodoStatus ,@User() user: UserEntity) {
        return this.todoService.getGroupTodos(status, user);
    }

    @Patch(':id')
    updateTodo(
        @Param('id') id: string,
        @Body('status', StatusValidation) status: TodoStatus,
        @User() user: UserEntity
    ) {
        return this.todoService.updateTodo(id, status, user);
    }

    @Patch('edit/:id')
    editTodo(
        @Param('id') id: string,
        @Body() data: CreateTodoDto,
        @User() user: UserEntity
    ) {
        return this.todoService.editTodo(id, data, user);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string, @User() user: UserEntity) {
        return this.todoService.delete(id, user);
    }
}
