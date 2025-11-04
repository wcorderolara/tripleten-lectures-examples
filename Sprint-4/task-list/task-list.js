const TaskList = function() {
    return `
        <ul class="task-list">
        </ul>
    `;
}

const TaskListItem = function(taskText, idItemToDelete) {
    return `
        <span class="task-text">
            ${taskText}
        </span>
        <button class="btn btn-danger" onclick="deleteTask(${idItemToDelete})">
            Delete
        </button>
    `
}