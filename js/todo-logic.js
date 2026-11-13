export const FILTER_ALL = "all";
export const FILTER_ACTIVE = "active";
export const FILTER_COMPLETED = "completed";

export function addTodo(todos, text, id = Date.now()) {
    const trimmedText = text.trim();
    if (trimmedText === "") {
        return [...todos];
    }
    return [...todos, { id, text: trimmedText, completed: false }];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function editTodo(todos, id, newText) {
    const trimmedText = newText.trim();
    if (trimmedText === "") {
        return [...todos];
    }
    return todos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo));
}

export function filterTodos(todos, filter) {
    if (filter === FILTER_ACTIVE) {
        return todos.filter((todo) => !todo.completed);
    }
    if (filter === FILTER_COMPLETED) {
        return todos.filter((todo) => todo.completed);
    }
    return [...todos];
}

export function countRemaining(todos) {
    return todos.filter((todo) => !todo.completed).length;
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}
