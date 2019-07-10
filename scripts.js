const todos = {
    todos: [],
    displayTodos: function() {
        console.log(this.todos);
    },
    addTodo: function(todo) {
        this.todos.push(todo);
        this.displayTodos();
    },
    changeTodo: function(index, newTodo) {
        this.todos[index] = newTodo;
        this.displayTodos();
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
        this.displayTodos();
    }
}