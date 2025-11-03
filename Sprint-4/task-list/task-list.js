const TaskList = function() {
    return `
        <ul class="task-list">
        </ul>
    `;
}

const TaskListItem = function(taskText) {
    return `
            <span class="task-text">
                ${taskText}
            </span>
            <button class="btn btn-danger">
                Delete
            </button>
    `
}