// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Functions
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;          // textContent keeps user input safe

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.append(span, deleteBtn);
    return li;
}

function renderTodos() {
    todoList.replaceChildren();

    const visible = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    visible.forEach(todo => todoList.appendChild(createTodoElement(todo)));
    updateStats();
}

function addTodo(text) {
    todos.push({ id: Date.now(), text: text, completed: false });
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function updateStats() {
    const remaining = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;
}

function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderTodos();
}

// Bonus: edit a task (double-click). Enter saves, Escape cancels.
function startEdit(li) {
    const id = Number(li.dataset.id);
    const todo = todos.find(t => t.id === id);
    const span = li.querySelector("span");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = todo.text;
    li.replaceChild(editInput, span);
    editInput.focus();

    let finished = false;
    function finish(save) {
        if (finished) return;
        finished = true;
        const newText = editInput.value.trim();
        if (save && newText) todo.text = newText;
        renderTodos();
    }

    editInput.addEventListener("keydown", e => {
        if (e.key === "Enter") finish(true);
        if (e.key === "Escape") finish(false);
    });
    editInput.addEventListener("blur", () => finish(true));
}

// Event Listeners
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;               // empty tasks not allowed
    addTodo(text);
    input.value = "";                      // clear input after adding
    input.focus();
});

// ONE listener on the ul handles clicks on every task (delegation)
todoList.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (event.target.closest(".delete-btn")) {
        deleteTodo(id);
    } else if (!event.target.closest(".edit-input")) {
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", function (event) {
    const li = event.target.closest("li");
    if (li && event.target.tagName === "SPAN") startEdit(li);
});

filters.forEach(btn => {
    btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

// Initialize
renderTodos();
