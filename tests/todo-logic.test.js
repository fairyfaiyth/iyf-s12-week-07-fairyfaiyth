import { describe, it, expect } from "vitest";
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    filterTodos,
    countRemaining,
} from "../js/todo-logic.js";

const sample = [
    { id: 1, text: "Buy milk", completed: false },
    { id: 2, text: "Study", completed: true },
];

describe("addTodo", () => {
    it("adds a new todo", () => {
        const result = addTodo([], "Read", 10);
        expect(result).toEqual([{ id: 10, text: "Read", completed: false }]);
    });

    it("ignores empty text", () => {
        expect(addTodo(sample, "   ")).toEqual(sample);
    });
});

describe("toggleTodo", () => {
    it("flips the completed state", () => {
        expect(toggleTodo(sample, 1)[0].completed).toBe(true);
    });

    it("does not change the original array", () => {
        toggleTodo(sample, 1);
        expect(sample[0].completed).toBe(false);
    });

    it("ignores an id that does not exist", () => {
        expect(toggleTodo(sample, 999)).toEqual(sample);
    });
});

describe("deleteTodo", () => {
    it("removes the todo with that id", () => {
        expect(deleteTodo(sample, 1)).toHaveLength(1);
    });
});

describe("filterTodos and countRemaining", () => {
    it("filters active and completed", () => {
        expect(filterTodos(sample, "active")).toHaveLength(1);
        expect(filterTodos(sample, "completed")).toHaveLength(1);
    });

    it("handles an empty list", () => {
        expect(countRemaining([])).toBe(0);
    });
});
