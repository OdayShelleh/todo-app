let todo = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todo, filters);

document.querySelector(".new-search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todo, filters);
});
document.querySelector(".form-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.todoName.value.trim();
  if (text.length > 0) {
    todo.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    localStorage.setItem("todos", JSON.stringify(todo));
    renderTodos(todo, filters);
    e.target.elements.todoName.value = "";
  }
});

document.querySelector(".hide-completed").addEventListener("change", (e) => {
  e.preventDefault();
  filters.hideCompleted = e.target.checked;
  renderTodos(todo, filters);
});
