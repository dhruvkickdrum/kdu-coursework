export class Todo {
    id: String;
    title: String;
    description?: String;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<Todo>) {
        Object.assign(this, partial);
    }
}