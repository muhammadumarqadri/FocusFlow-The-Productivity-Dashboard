// script.js

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Real-Time Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Focus Timer (25 min = 1500 seconds)
let timer;
let secondsLeft = 1500;

function updateTimerDisplay() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  document.getElementById('time-display').textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('start-timer').addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alert("Time's up! Take a break. 🧘");
        secondsLeft = 1500;
        updateTimerDisplay();
      }
    }, 1000);
  }
});

document.getElementById('stop-timer').addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});

// Initial display
updateTimerDisplay();

// To-Do List
const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Load from localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodoToDOM(todo));
}
loadTodos();

function addTodoToDOM(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });
  todoList.appendChild(li);
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push(li.textContent);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

todoBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text) {
    addTodoToDOM(text);
    saveTodos();
    todoInput.value = '';
  }
});

// Quotes API
const quoteBox = document.getElementById('quote');
const quotes = [
  { q: "What you do today can improve all your tomorrows.", a: "Ralph Marston" },
  { q: "Quality means doing it right when no one is looking.", a: "Henry Ford" },
  { q: "Stay hungry, stay foolish.", a: "Steve Jobs" },
];

function loadLocalQuote() {
  const { q, a } = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = `"${q}" — ${a}`;
}
loadLocalQuote();
