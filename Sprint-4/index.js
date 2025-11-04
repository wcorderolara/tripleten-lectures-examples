const app = document.getElementById('app');
let taskCounter = 0;

app.innerHTML = `
    ${InputGroup()}
    ${TaskList()}
`;

/**
 * EVENTS HANDLERS SECTION
 */

const addButton = document.querySelector('.btn-primary');

addButton.addEventListener('click', function() {
    taskCounter++;
    const taskInput = document.querySelector('#taskInput');
    const taskList = document.querySelector('.task-list');

    const taskText = document.createElement('li'); // <li></li>
    taskText.className = 'task-item'; // <li class="task-item"></li>
    // we are creating the list Item content
    taskText.innerHTML = TaskListItem(taskInput.value, taskCounter);
    // create an task-id attribute and assign the taskcounter value
    taskText.setAttribute('task-id', taskCounter);
    
    taskList.appendChild(taskText);
})

// DELETE FUNCTION
function deleteTask(idItem) {
    alert('One item will be deleted: ' + idItem);
}
