const todos = {
    todos: []
};

let $ = function(elem) {
    return document.querySelector(elem);
}

$("#toggleAll").onclick = () => { todos.toggleAll(); };
$("#newTodoButton").onclick = () => {
    let newTodo = $("#newTodo").value;
    todos.addTodo(newTodo);
    $("#newTodo").value = "";
};
$("#changeTodoButton").onclick = () => {
    let index = $("#changeTodoIndex").valueAsNumber;
    let text = $("#changeTodoText").value;
    todos.changeTodo(index, text);
    $("#changeTodoIndex").value = "";
    $("#changeTodoText").value = "";
};
$("#deleteTodoButton").onclick = () => {
    let index = $("#deleteTodoIndex").valueAsNumber;
    todos.deleteTodo(index);
    $("#deleteTodoIndex").value = "";
};
$("#toggleTodoButton").onclick = () => {
    let index = $("#toggleTodoIndex").valueAsNumber;
    todos.toggleCompleted(index);
    $("#toggleTodoIndex").value = "";
}

todos.addTodo = function(text) {
    this.todos.push({
        todoText: text,
        completed: false
    });
    display.displayTodos();
};

todos.changeTodo = function(index, newText) {
    this.todos[index].todoText = newText;
    display.displayTodos();
};

todos.deleteTodo = function(index) {
    this.todos.splice(index, 1);
    display.displayTodos();
};

todos.toggleCompleted = function(index) {
    this.todos[index].completed = !this.todos[index].completed;
    display.displayTodos();
};

todos.toggleAll = function() {
    let falseCheck = this.todos.filter((item) => {
        return item.completed == true;
    });
    
    if (falseCheck.length === this.todos.length) {
        for (let i = 0; i < this.todos.length; i++) {
            this.todos[i].completed = !this.todos[i].completed;
        }
    } else {
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === false) {
                this.todos[i].completed = !this.todos[i].completed;
            }
        }
    }
    display.displayTodos();
};

const display = {};

display.displayTodos = function() {
    let todosList = $("#todosList");
    todosList.innerHTML = "";
    for (let i = 0; i < todos.todos.length; i++) {
        let todosLi = document.createElement("li");

        if (todos.todos[i].completed) {
            todosLi.innerHTML = "[X] " + todos.todos[i].todoText;
        } else {
            todosLi.innerHTML = "[ ] " + todos.todos[i].todoText;
        }
        todosList.appendChild(todosLi);
    }
}

display.createDeleteButton = function() {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
};