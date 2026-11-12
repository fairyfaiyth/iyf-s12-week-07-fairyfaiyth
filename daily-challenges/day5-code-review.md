# Day 5: Code Review of the Weather Dashboard

Reviewed: Week 6 weather app (`iyf-s12-week-06-fairyfaiyth`)

## Does it handle all error cases?
- Unknown city: yes, a 404 shows "City not found."
- Bad or inactive API key: yes, a 401 shows "Invalid API key."
- No internet: yes, a TypeError shows "Network problem."
- Other server errors: yes, a generic "Failed to fetch weather." message
- Empty input: yes, the form is `required` and the value is trimmed
- Gap: the loading state has no timeout, so a very slow network waits forever

## Is the code well organised?
- Good: separate functions for fetching, displaying, errors and history
- Good: the key lives only in `config.js`, which is git-ignored
- Weak: `showLoading`, `hideLoading`, `showError` and `hideError` repeat the same idea
- Weak: status codes and the storage key were magic values
- Weak: everything is in one file, with no modules or tests

## Can another developer understand it?
- Good: function names say what they do
- Weak: no comments explaining why, for example why a TypeError means "network problem"
- Weak: the README does not explain the deploy workflow

## What I changed
See `daily-challenges/day4-refactor/`: named constants, one `setVisible` helper,
small functions for error messages, and comments that explain the reasons.

## Still to do
- Add a request timeout
- Split into modules and add unit tests, as in the To-Do List
