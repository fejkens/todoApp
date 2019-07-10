let todos = [];

function displayTodos() {
    console.log("My Todos:", todos);
}

function addTodo(todo) {
    todos.push(todo);
    displayTodos();
}

function changeTodo(position, todo) {
    todos[position] = todo;
    displayTodos();
}

function deleteTodo(position, todo) {
    todos.splice(position, 1);
    displayTodos();
}