const todos = {
    todos: []
}

todos.displayTodos = function() {
    console.log(this.todos);
}

todos.addTodo = function(text) {
    this.todos.push({
        todoText: text,
        completed: false
    });
    this.displayTodos();
}

todos.changeTodo = function(index, newText) {
    this.todos[index].todoText = newText;
    this.displayTodos();
}

todos.deleteTodo = function(index) {
    this.todos.splice(index, 1);
    this.displayTodos();
}

todos.toggleCompleted = function(index) {
    this.todos[index].completed = !this.todos[index].completed;
}