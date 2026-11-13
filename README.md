# Week 7: JavaScript Best Practices

## Author
- **Name:** Faith Mutisya
- **GitHub:** [@fairyfaiyth](https://github.com/fairyfaiyth)
- **Date:** November 12, 2026

## Project Description
My Week 5 To-Do List, refactored. It saves to localStorage, is split into ES modules, passes ESLint, and has unit tests. The repo also has the Lesson 13 practice files, a Shopping Cart, and the five daily challenges.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES modules, localStorage, sessionStorage)
- ESLint and Prettier
- Vitest

## Features
- To-Do List that survives a page refresh (tasks, completed state and filter)
- Add, toggle, edit, delete, filter and clear completed
- Pure logic functions in `js/todo-logic.js`, tested with `npm test`
- Shopping Cart in `cart/` with quantity, total, count and persistence

## How to Run
1. Clone this repository
2. Run `npm install`
3. Run `python -m http.server 8000` and open `http://localhost:8000`
4. Run `npm run lint` to check the code and `npm test` to run the tests

Modules only load from a server, so double-clicking `index.html` will not work.

## Lessons Learned
localStorage only stores strings, so objects need JSON.stringify and JSON.parse. Pure functions that return new arrays are easy to test. One `commit()` that saves and redraws keeps the data and the page in step. ESLint catches style problems, but only debugging finds bugs like off-by-one errors and typos.

## Challenges Faced
Setting up npm and Vitest in Termux, fixing ESLint errors about the `API_KEY` global, and fixing a Termux session that reset in the middle of work.

## Collaboration
- **My PR:** https://github.com/fairyfaiyth/iyf-s12-week-07-fairyfaiyth/pull/1
- **PR I reviewed:** https://github.com/Wesala-crypto/iyf-s12-week-07-wesala-crypto/pull/1
- **Who reviewed mine:** @Wesala-crypto

## Live Demo
[View Live Demo](https://fairyfaiyth.github.io/iyf-s12-week-07-fairyfaiyth/)
