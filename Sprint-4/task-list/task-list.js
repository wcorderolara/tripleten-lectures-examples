const TaskList = function() {
    return `
        <ul class="task-list">
        </ul>
        <button class="btn btn-warning" onclick="deleteAllItems()">
            Delete all tasks
        </button>
    `;
}

// returning Strings
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