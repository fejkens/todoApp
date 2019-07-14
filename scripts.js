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
        let todosCheckbox = document.createElement("input");
        let todoText = document.createElement("p");

        todoText.innerHTML = elem.todoText;
        todosCheckbox.type = "checkbox";
        todosLi.id = "todoId" + i;
        todoText.className = "pFalse";

        if (elem.completed === true) {
            todoText.className = "pTrue"
        }

        todosCheckbox.addEventListener("change", function() {
            if (todosCheckbox.checked === true) {
                todos.todos[i].completed = true;
            } else {
                todos.todos[i].completed = false;
            }
            display.displayTodos();
        });

        todosLi.appendChild(todosCheckbox);
        todosLi.appendChild(todoText);

        if (elem.completed) {
            todosCheckbox.checked = true;
        } else {
            todosCheckbox.checked = false;
        }

        todosLi.appendChild(display.createDeleteButton());
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