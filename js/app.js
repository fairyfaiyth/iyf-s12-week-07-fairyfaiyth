import { state } from "./state.js";
import { save } from "./storage.js";
import { addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } from "./todo-logic.js";
import { render, bindEvents } from "./ui.js";

function commit() {
    save("todos", state.todos);
    save("filter", state.filter);
    render(state);
}

bindEvents({
    onAdd: (text) => {
        state.todos = addTodo(state.todos, text);
        commit();
    },
    onToggle: (id) => {
        state.todos = toggleTodo(state.todos, id);
        commit();
    },
    onDelete: (id) => {
        state.todos = deleteTodo(state.todos, id);
        commit();
    },
    onEdit: (id, newText) => {
        if (newText !== null) {
            state.todos = editTodo(state.todos, id, newText);
        }
        commit();
    },
    onFilter: (filter) => {
        state.filter = filter;
        commit();
    },
    onClearCompleted: () => {
        state.todos = clearCompleted(state.todos);
        commit();
    },
});

render(state);
