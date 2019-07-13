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

    this.todos.forEach(function (elem) {
        if (falseCheck.length === todos.todos.length) {
            elem.completed = !elem.completed;
        } else {
            if (elem.completed === false) {
                elem.completed = !elem.completed;
            }
        }
    });

    display.displayTodos();
};

const display = {};

display.displayTodos = function() {
    let todosList = $("#todosList");
    todosList.innerHTML = "";
    todos.todos.forEach(function (elem, i) {
        let todosLi = document.createElement("li");
        todosLi.id = "todoId" + i;

        if (elem.completed) {
            todosLi.innerHTML = "[X] " + elem.todoText;
        } else {
            todosLi.innerHTML = "[ ] " + elem.todoText;
        }

        todosLi.appendChild(display.createDeleteButton());
        todosLi.appendChild(display.createCompletedButton());
        todosList.appendChild(todosLi);
    });
}

display.createDeleteButton = function() {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";

    deleteButton.addEventListener("click", function(event) {
        let deleteId = event.originalTarget.parentElement.id;
        deleteId = +deleteId.slice(deleteId.length - 1);
        todos.deleteTodo(deleteId);
    });

    return deleteButton;
};

display.createCompletedButton = function() {
    let completedButton = document.createElement("button");
    completedButton.textContent = "Completed";
    completedButton.className = "completedButton";

    completedButton.addEventListener("click", function(event) {
        let completedId = event.originalTarget.parentElement.id;
        completedId = +completedId.slice(completedId.length - 1);
        todos.toggleCompleted(completedId);
    });

    return completedButton;
}