import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { v4 as uuidv4} from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    private readonly logger = new Logger(TodoService.name);
    private todos: Todo[] = [];

    create(createTodoDto: CreateTodoDto): Todo {
        const now = new Date();
        const todo = new Todo({
            id: uuidv4(),
            title: createTodoDto.title,
            description: createTodoDto.description,
            completed: false,
            createdAt: now,
            updatedAt: now,
        });

        this.todos.push(todo);
        this.logger.log(`Todo Created with ID: ${todo.id}`);

        return todo;
    }

    findAll(): Todo[] {
        this.logger.log(`Retrieved ${this.todos.length} todos`);
        return this.todos;
    }

    findOne(id: string): Todo {
        const todo = this.todos.find((todo) => todo.id === id);
        if(!todo) {
            this.logger.warn(`Todo with Id: ${id} not found`);
            throw new NotFoundException(`Todo with ID: "${id}" not found`);
        }
        this.logger.log(`Retrieved todo with ID: ${id}`);
        return todo;
    }

    update(id: string, updateTodoDto: UpdateTodoDto) : Todo {
        const todo = this.findOne(id);

        Object.assign(todo, {
            ...updateTodoDto,
            updatedAt: new Date(),
        });

        this.logger.log(`Todo with ID: ${id} updated`);
        return todo;
    }

    remove(id: string): void {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if(index == -1) {
            this.logger.warn(`Todo with ID ${id} not founf for deletion`);
            throw new NotFoundException(`Todo with ID: "${id}" not found`);
        }
        this.todos.splice(index, 1);
        this.logger.log(`Todo with ID: ${id} deleted`);
    }

}
