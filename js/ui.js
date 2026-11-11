import { filterTodos, countRemaining } from "./todo-logic.js";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filterButtons = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.append(span, deleteBtn);
    return li;
}

export function render(state) {
    todoList.replaceChildren();
    filterTodos(state.todos, state.filter).forEach((todo) => {
        todoList.appendChild(createTodoElement(todo));
    });

    const remaining = countRemaining(state.todos);
    const label = remaining === 1 ? "item" : "items";
    itemsLeft.textContent = `${remaining} ${label} left`;

    filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });
}

function startEdit(li, onSave) {
    const span = li.querySelector("span");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = span.textContent;
    li.replaceChild(editInput, span);
    editInput.focus();

    let finished = false;
    function finish(save) {
        if (finished) {
            return;
        }
        finished = true;
        onSave(save ? editInput.value : null);
    }

    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            finish(true);
        }
        if (event.key === "Escape") {
            finish(false);
        }
    });
    editInput.addEventListener("blur", () => finish(true));
}

export function bindEvents(handlers) {
    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = todoInput.value.trim();
        if (text === "") {
            return;
        }
        handlers.onAdd(text);
        todoInput.value = "";
        todoInput.focus();
    });

    todoList.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li) {
            return;
        }
        const id = Number(li.dataset.id);
        if (event.target.closest(".delete-btn")) {
            handlers.onDelete(id);
        } else if (!event.target.closest(".edit-input")) {
            handlers.onToggle(id);
        }
    });

    todoList.addEventListener("dblclick", (event) => {
        const li = event.target.closest("li");
        if (li && event.target.tagName === "SPAN") {
            const id = Number(li.dataset.id);
            startEdit(li, (newText) => handlers.onEdit(id, newText));
        }
    });

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => handlers.onFilter(btn.dataset.filter));
    });

    clearCompletedBtn.addEventListener("click", handlers.onClearCompleted);
}
