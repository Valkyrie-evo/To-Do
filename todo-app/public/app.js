// public/app.js
function addTask() {
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;
  document.getElementById('task-list').appendChild(li);
  input.value = '';
}

// public/app.js

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => deleteTask(task.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) return;

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  });
  loadTasks();
}

window.onload = loadTasks;

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No tasks yet!';
    empty.style.color = 'gray';
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => deleteTask(task.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}
