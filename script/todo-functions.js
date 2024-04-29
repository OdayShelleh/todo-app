"use strict";

function getSavedTodos() {
  const todoJSON = localStorage.getItem("todos");

  try {
    return todoJSON ? JSON.parse(todoJSON) : [];
  } catch (error) {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(id) {
  const index = todo.findIndex((todoItem) => {
    return todoItem.id === id;
  });

  if (index > -1) {
    todo.splice(index, 1);
  }
}
function toggleTodo(id) {
  const td = todo.find((todoItem) => {
    return todoItem.id === id;
  });

  if (td) {
    td.completed = !td.completed;
  }
}

function generateTodoDOM(todoItem) {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkBox = document.createElement("input");
  const textEl = document.createElement("span");
  const removeButton = document.createElement("button");

  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todoItem.completed;
  textEl.textContent = todoItem.text;

  checkBox.addEventListener("change", (e) => {
    e.target.checked = !todoItem.completed;
    toggleTodo(todoItem.id);
    saveTodos(todo);
    renderTodos(todo, filters);
  });

  todoEl.classList.add("list-item");
  containerEl.appendChild(checkBox);
  containerEl.appendChild(textEl);
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);
  removeButton.textContent = "remove ";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todoItem.id);
    saveTodos(todo);
    renderTodos(todo, filters);
  });

  // const todoEl = document.createElement("p");
  // todoEl.textContent = todo.text;
  return todoEl;
}

function generateSummeryDOM(filteredTodos) {
  const notCompletedElement = filteredTodos.filter((item) => {
    return !item.completed;
  });
  const h2 = document.createElement("h2");
  h2.textContent =
    notCompletedElement.length > 1
      ? `You have ${notCompletedElement.length} todos left to do`
      : `You have ${notCompletedElement.length} todo left to do`;
  h2.classList.add("list-title");
  document.querySelector(".todos").appendChild(h2);
}

function renderTodos(todos, filters) {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase().trim());
    const filterCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && filterCompletedMatch;
  });

  // filteredTodos = filteredTodos.filter((todo) => {
  //   return !filters.hideCompleted || !todo.completed;
  //   // if (filters.hideCompleted) {
  //   //   return !todo.completed;
  //   // } else {
  //   //   return true;
  //   // }
  // });

  document.querySelector(".todos").innerHTML = "";

  generateSummeryDOM(filteredTodos);

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todoItem) => {
      document.querySelector(".todos").appendChild(generateTodoDOM(todoItem));
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No todos to show";
    emptyMessage.classList.add("empty-message");
    document.querySelector(".todos").appendChild(emptyMessage);
  }
}
