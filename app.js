//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const validity = document.querySelector(".validity");

//Event listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);

//functions

function addTodo(e) {
  e.preventDefault();
  //to-do-list
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");

  newTodo.innerText = todoInput.value;

  todoDiv.appendChild(newTodo);
  //check button
  const checkButton = document.createElement("button");
  checkButton.classList.add("check-button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(checkButton);
  //trash
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  if (todoInput.value) {
    todoList.appendChild(todoDiv);
    savedTodos(todoInput.value);
  } else {
    validity.innerText = "Please select a value!";
  }

  todoInput.value = "";
}

function deleteItem(e) {
  const item = e.target;
  // console.log(item.classList);
  //delete button
  if (item.classList[0] === "trash-button") {
    const todo = e.target.parentElement;
    removeTodos(todo);
    todo.remove();
  }
  //check button
  if (item.classList[0] === "check-button") {
    const todo = e.target.parentElement;
    todo.classList.toggle("complete");
  }
}

function savedTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");

    newTodo.innerText = todo;

    todoDiv.appendChild(newTodo);
    //check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkButton);
    //trash
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

//Remove todos

function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
