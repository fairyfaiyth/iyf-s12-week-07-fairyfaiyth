const users = [
    { name: "Amina", age: 21 },
    { name: "Juma", age: 25 },
];

console.log("Basic message");
console.warn("This might be a problem");
console.error("This is definitely wrong");
console.table(users);

console.group("User Processing");
console.log("Step 1");
console.log("Step 2");
console.groupEnd();

console.time("loop");
for (let i = 0; i < 1000000; i++) {
    // just counting
}
console.timeEnd("loop");
