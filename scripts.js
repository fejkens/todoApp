const todos = {
    todos: []
};

let $ = function(elem) {
    return document.querySelector(elem);
}

$("#displayTodos").onclick = () => { todos.displayTodos(); };
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

todos.displayTodos = function() {
    if (this.todos.length == 0) {
        return console.log("You don't have any todos!");
    }

    console.log("My Todos:");

    for (let i = 0; i < this.todos.length; i++) {
        if(this.todos[i].completed == false) {
            console.log("[ ]", this.todos[i].todoText);
        } else {
            console.log("[X]", this.todos[i].todoText);
        }
    }
};

todos.addTodo = function(text) {
    this.todos.push({
        todoText: text,
        completed: false
    });
    this.displayTodos();
};

todos.changeTodo = function(index, newText) {
    this.todos[index].todoText = newText;
    this.displayTodos();
};

todos.deleteTodo = function(index) {
    this.todos.splice(index, 1);
    this.displayTodos();
};

todos.toggleCompleted = function(index) {
    this.todos[index].completed = !this.todos[index].completed;
    this.displayTodos();
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
    this.displayTodos();
};