// jQuery style selector function
let $ = function(elem) {
    return document.querySelector(elem);
};

// If todos array does not exist in localStorage, initiate it
if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
}

// Toggle all button event handler
$("#toggleAll").onclick = () => { todos.toggleAll(); };

// New todo button event handler
$("#newTodoButton").onclick = () => {
    let newTodo = $("#newTodo").value;
    todos.addTodo(newTodo);
    $("#newTodo").value = "";
};

// Main todos object
const todos = {};

// Get todos from localStorage
todos.todos = function() {
    return JSON.parse(localStorage.getItem("todos"));
}

// Update todos stored in localStorage with a new array
todos.updateTodos = function(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("todos", arr);
};

// Add a todo
todos.addTodo = function(text) {
    let todosArr = todos.todos();
    todosArr.push({
        todoText: text,
        completed: false
    });
    todos.updateTodos(todosArr);
    display.displayTodos();
};

// Change a todo at index
todos.changeTodo = function(index, newText) {
    let todosArr = todos.todos();
    todosArr[index].todoText = newText;
    todos.updateTodos(todosArr);
    display.displayTodos();
};

// Delete a todo
todos.deleteTodo = function(index) {
    let todosArr = todos.todos();
    todosArr.splice(index, 1);
    todos.updateTodos(todosArr);
    display.displayTodos();
};

// Toggle the completed attribute
todos.toggleCompleted = function(index) {
    let todosArr = todos.todos();
    todosArr[index].completed = !todosArr[index].completed;
    todos.updateTodos(todosArr);
    display.displayTodos();
};

// Toggle the completed attribute for all todos
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

// Display object
const display = {};

// Display todos on the page
display.displayTodos = function() {

    let todosList = $("#todosList");

    // Clear current list before refreshing the display
    todosList.innerHTML = "";
    let todosArr = todos.todos();

    todosArr.forEach(function (elem, i) {
        // Create todo item elements
        let todosLi = document.createElement("li");
        let todosCheckbox = document.createElement("input");
        let todoText = document.createElement("p");
        let editText = document.createElement("input");

        // Give each li item an id with the index of the item from the todo array
        todosLi.id = "todoId" + i;

        todosCheckbox.type = "checkbox";

        todoText.innerHTML = elem.todoText;
        todoText.className = "pFalse"; // Styling

        if (elem.completed === true) {
            todoText.className = "pTrue"; // Styling
        }

        editText.type = "text";
        editText.className = "editTodo";
        editText.value = elem.todoText;

        // Event listener for when checkboxes are ticked/unticked
        todosCheckbox.addEventListener("change", function() {
            if (todosCheckbox.checked === true) {
                todosArr[i].completed = true;
            } else {
                todosArr[i].completed = false;
            }
            todos.updateTodos(todosArr);
            display.displayTodos();
        });

        // When user clicks on the todo text, display the edit box
        todoText.addEventListener("click", function() {
            todoText.style.display = "none";
            editText.style.display = "inline";
            editText.focus();
        });

        // When user clicks away from the edit todo box save the text as the new todo text
        editText.addEventListener("blur", function() {
            let newTodoText = editText.value;
            todos.changeTodo(i, newTodoText);
            todoText.style.display = "inline";
            editText.style.display = "none";
        });

        // If item is marked as completed, update the checkbox
        if (elem.completed) {
            todosCheckbox.checked = true;
        } else {
            todosCheckbox.checked = false;
        }

        // Append all items to the list
        todosLi.appendChild(todosCheckbox);
        todosLi.appendChild(editText);
        todosLi.appendChild(todoText);
        todosLi.appendChild(display.createDeleteButton());
        todosList.appendChild(todosLi);
    });
};

// Create delete buttons for each todo displayed
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

// Call the display function
display.displayTodos();