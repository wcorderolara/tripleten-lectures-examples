const app = document.getElementById('app');

app.innerHTML = `
    ${InputGroup()}
    ${TaskList()}
`;

/**
 * EVENTS HANDLERS SECTION
 */

const addButton = document.querySelector('.btn-primary');

addButton.addEventListener('click', function() {
    const taskInput = document.querySelector('#taskInput');
    const taskList = document.querySelector('.task-list');

    const taskText = document.createElement('li');
    taskText.className = 'task-item';
    taskText.innerHTML = TaskListItem(taskInput.value);
    
    taskList.appendChild(taskText);
})

