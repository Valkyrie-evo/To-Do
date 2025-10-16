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
