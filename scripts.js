const todos = {
    todos: []
};

document.getElementById("displayTodos").onclick = () => { todos.displayTodos(); };
document.getElementById("toggleAll").onclick = () => { todos.toggleAll(); }; 

todos.displayTodos = function() {
    debugger;
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
};

todos.toggleAll = function() {
    let falseCheck = this.todos.filter((item) => {
        return item.completed == true;
    });
    
    if (falseCheck.length === this.todos.length) {
        for (let i = 0; i < this.todos.length; i++) {
            todos.toggleCompleted(i);
        }
    } else {
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === false) {
                todos.toggleCompleted(i);
            }
        }
    }
};