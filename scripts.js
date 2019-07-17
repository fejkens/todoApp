if (JSON.parse(localStorage.getItem("todos")).length === 0) {
    localStorage.setItem("todos", JSON.stringify([]));
}

const todos = {
    todos: function() {
        return JSON.parse(localStorage.getItem("todos"));
    }
};

let $ = function(elem) {
    return document.querySelector(elem);
};

$("#toggleAll").onclick = () => { todos.toggleAll(); };
$("#newTodoButton").onclick = () => {
    let newTodo = $("#newTodo").value;
    todos.addTodo(newTodo);
    $("#newTodo").value = "";
};

todos.updateTodos = function(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("todos", arr);
};

todos.addTodo = function(text) {
    let todosArr = todos.todos();
    todosArr.push({
        todoText: text,
        completed: false
    });
    todos.updateTodos(todosArr);
    display.displayTodos();
};

todos.changeTodo = function(index, newText) {
    let todosArr = todos.todos();
    todosArr[index].todoText = newText;
    todos.updateTodos(todosArr);
    display.displayTodos();
};

todos.deleteTodo = function(index) {
    let todosArr = todos.todos();
    todosArr.splice(index, 1);
    todos.updateTodos(todosArr);
    display.displayTodos();
};

todos.toggleCompleted = function(index) {
    let todosArr = todos.todos();
    todosArr[index].completed = !todosArr[index].completed;
    todos.updateTodos(todosArr);
    display.displayTodos();
};

todos.toggleAll = function() {
    let todosArr = todos.todos();
    let falseCheck = todosArr.filter((item) => {
        return item.completed == true;
    });

    todosArr.forEach(function (elem) {
        if (falseCheck.length === todosArr.length) {
            elem.completed = !elem.completed;
        } else {
            if (elem.completed === false) {
                elem.completed = !elem.completed;
            }
        }
    });
    todos.updateTodos(todosArr);
    display.displayTodos();
};

const display = {};

display.displayTodos = function() {
    let todosList = $("#todosList");
    todosList.innerHTML = "";
    let todosArr = todos.todos();
    todosArr.forEach(function (elem, i) {
        let todosLi = document.createElement("li");
        let todosCheckbox = document.createElement("input");
        let todoText = document.createElement("p");
        let editText = document.createElement("input");

        todoText.innerHTML = elem.todoText;
        todosCheckbox.type = "checkbox";
        todosLi.id = "todoId" + i;
        todoText.className = "pFalse";
        editText.type = "text";
        editText.style.background = "transparent";
        editText.style.border = "none";
        editText.style.borderBottom = "solid 1px black";
        editText.className = "editTodo";
        editText.value = elem.todoText;
        editText.autofocus = "true";

        if (elem.completed === true) {
            todoText.className = "pTrue";
        }

        todosCheckbox.addEventListener("change", function() {
            if (todosCheckbox.checked === true) {
                todosArr[i].completed = true;
            } else {
                todosArr[i].completed = false;
            }
            todos.updateTodos(todosArr);
            display.displayTodos();
        });

        editText.addEventListener("blur", function() {
            
            let newTodoText = editText.value;
            todos.changeTodo(i, newTodoText);
            todoText.style.display = "inline";
            editText.style.display = "none";
        });

        todoText.addEventListener("click", function() {
            todoText.style.display = "none";
            editText.style.display = "inline";
        });

        todosLi.appendChild(todosCheckbox);
        todosLi.appendChild(editText);
        todosLi.appendChild(todoText);

        if (elem.completed) {
            todosCheckbox.checked = true;
        } else {
            todosCheckbox.checked = false;
        }

        todosLi.appendChild(display.createDeleteButton());
        todosList.appendChild(todosLi);
    });
};

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

display.displayTodos();