const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-btn');
const newTaskInput = document.getElementById('new-task');

let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

addBtn.addEventListener('click', addTask);

function addTask() {
    const newTask = newTaskInput.value.trim();
    if (newTask !== '') {
        tasks.push({ text: newTask, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        newTaskInput.value = '';
    } else {
        alert('Please enter a task');
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="task-edit">Edit</button>
            <button class="task-delete">Delete</button>
        `;
        taskList.appendChild(taskElement);

        // Add event listeners for edit and delete buttons
        const editBtn = taskElement.querySelector('.task-edit');
        const deleteBtn = taskElement.querySelector('.task-delete');
        editBtn.addEventListener('click', () => editTask(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // Add event listener for checkbox
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleCompleted(index));
    });
}

function editTask(index) {
    const task = tasks[index];
    const newTask = prompt('Enter new task:', task.text);
    if (newTask !== null) {
        task.text = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleCompleted(index) {
    const task = tasks[index];
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}