import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
    private readonly logger = new Logger(TodoController.name);
    
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto: CreateTodoDto) : Todo {
        this.logger.log('POST /todos : Create new todos');
        return this.todoService.create(createTodoDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() : Todo[] {
        this.logger.log('Get /todos : Return all todos');
        return this.todoService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string): Todo {
        this.logger.log(`Get /todos/${id} : Return todo with ID: ${id}`);
        return this.todoService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
        this.logger.log(`PUT /todos/${id} : Updating todos`);
        return this.todoService.update(id, updateTodoDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) : void {
        this.logger.log(`DELETE /todos/${id} : Delete todo with ID : ${id}`)
        this.todoService.remove(id);
    }
}
