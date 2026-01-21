// main.js

// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------
// Grab references to the main UI elements.
// These IDs should already exist in index.html.

// TODO: Select the main todo list container
const toDo = document.querySelector('#todo-list');
// TODO: Select the output area for text and messages
const output = document.querySelector('#output');
// TODO: Select the Run Demo button
const demoButton = document.querySelector('#btn-run');
// TODO: Select the Clear button
const clearButton = document.querySelector('#btn-clear');
// --------------------------------------------------
// STEP 2: Variables and template strings
// --------------------------------------------------
// Create a constant and a variable, then display
// them using a template string.

// TODO: Create a constant named course
const course = 'SDEV2150';
// TODO: Create a variable named topic
let topic = 'JS Review';
// TODO: Use a template string to display both values
let combined = `<p>My course "${course}, the topic ${topic}</p>`;
console.log(output)

output.innerHTML = combined
output.innerHTML += `<p>This was added using +=</p>`
// --------------------------------------------------
// STEP 3: Functions and return values
// --------------------------------------------------
// Write a function that adds two numbers and
// another function that formats a label/value pair.

// TODO: Create a function add(a, b)
function formatResult(label, value) {
    return `${label}: ${value}`;
}
// TODO: Create an arrow function formatResult(label, value)
output.innerHTML += `<p>${formatResult('2+3', 2 + 3)}</p>`
// TODO: Call the functions and display the result

// --------------------------------------------------
// STEP 4: Arrays, objects, and iteration
// --------------------------------------------------
// Create an array of task objects and count
// how many are marked as done.

// TODO: Create an array named tasks
// Each task should have: title (string), done (boolean)
const tasks = [
    { title: 'install dependencies', done: true},
    { title: 'Run dev server', done: true },
    { title: 'Complete the review demo', done: false},
    { title: 'eat sammich', done: false},
]

// TODO: Use a loop to count completed tasks
let completedCount = 0;
for (const task of tasks) {
    if (task.done) completedCount++;
}
console.log(`Number of completed tasks: ${completedCount}`)
// TODO: Display: "Completed: X of Y"

// --------------------------------------------------
// STEP 5: Problem solving – build HTML from data
// --------------------------------------------------
// Build a function that converts the tasks array
// into an HTML list using a loop.

// TODO: Create a function renderTaskList(items)
// - Start with '<ul>'
// - Loop over items
// - Add <li> elements with a class of 'done' or 'todo'
const todoList = document.querySelector('#todo-list')
// - Close the list and return the string
function renderTaskList(items) {
    let html = '<ul>';
    for (const item of items) {
        const status = item.done ? "done" : "todo";
        const checked = item.done ? "&#10003" : "&#10006";
        // ternary in js
        // take a bool condition. if its true, first option, false, second option
        html += `<li class="${status}">${item.title} ${checked}</li>`;
    };
    html += '</ul>'
    return html;
}

// TODO: Render the task list inside the list container
todoList.innerHTML += renderTaskList(tasks);
// --------------------------------------------------
// STEP 6: DOM manipulation with createElement
// --------------------------------------------------
// Create and append elements instead of using innerHTML.

// TODO: Create a function addMessage(message)
// - Create a <p> element
// - Set its textContent
// - Append it to the output element
function addMessage(message) {
    console.log(`message added: ${message}`);
    const p = document.createElement('p');
    p.textContent = message
    console.log(p.textContent);
    output.appendChild(p);
}
// TODO: Test the addMessage function
let someText = "hi";

addMessage(someText)
// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.

// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list
function runDemo() {
    output.innerHTML = "";
    addMessage("Running demo...")
    addMessage(formatResult("5 + 8"), 5 + 8);
}

// TODO: Create a function clearUI()
// - Clear both output and todo list containers
function clearTimeout() {
    output.innerHTML = "";
    todoList.innerHTML = "";
}

// TODO: Add click listeners for btnRun and btnClear
demoButton.addEventListener('click', runDemo)
clearButton.addEventListener('click', clearTimeout)
// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------
const btnAdd = document.querySelector('#btn-add')
const txtTask = document.getElementById('txt-task');

// function addTodo(event) {
//     let el = event.target
//     let input = el.previousElementSibling.value
//     if (todoList.innerHTML === "") {
//         let ul = document.createElement('ul')
//         todoList.appendChild(ul)
//     }
//     let content = document.createElement('li')
//     content.classList.add("todo")
//     content.textContent = input
//     todoList.firstElementChild.appendChild(content)
//     txtTask.value = '';
// }

btnAdd.addEventListener('click', () => {
  const title = txtTask.value.trim();
  if (!title) return;

  tasks.push({ title, done: false });
  todoList.innerHTML = renderTaskList(tasks);
  txtTask.value = '';
});
// --------------------------------------------------
// STEP 9: Student Exercise
// --------------------------------------------------
// Complete these AFTER the demo:

// 1. Create a function toggleDone(title)
//    - Find a task by title
//    - Flip its done value (true/false)
function toggleDone(title) {
    for (const task of tasks) {
        if (task.title === title) {
            task.done = !task.done;
        }
    }
}
// 2. Update renderTaskList() to show '(done)' or '(todo)'

// 3. Add event delegation to the <ul>
//    - When a list item is clicked:
//      * Toggle the task
//      * Re-render the list
todoList.addEventListener('click', (event) => {
    let el = event.target
    if (el.nodeName === "LI") {
        let elTitle = el.textContent.substring(0, el.textContent.length - 1);
        elTitle = elTitle.trim()
        toggleDone(elTitle)

        todoList.innerHTML = renderTaskList(tasks);
    }
});

// 4. Stretch goals:
//    - Display a chekcbox next to each task to represent done/todo 
//      (checking/unchecking it toggles the state) x
//    - Update the UI so that pressing enter in the text input adds 
//      the task (notice we aren't using a form
//    - Display a summary line above the list
//      e.g. "Completed: 2 of 3"
