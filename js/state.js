import { load } from "./storage.js";
import { FILTER_ALL } from "./todo-logic.js";

export const state = {
    todos: load("todos", []),
    filter: load("filter", FILTER_ALL),
};
