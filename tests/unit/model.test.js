const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
    });

    test('should add a new todo', () => {
        const text = 'Buy milk';
        service.addTodo(text);

        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe(text);
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo('Test toggle');
        const todoId = service.todos[0].id;

        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(true);

        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        service.addTodo('Test remove');
        const todoId = service.todos[0].id;

        service.removeTodo(todoId);
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        service.addTodo('');
        expect(service.todos.length).toBe(0);
    });
});