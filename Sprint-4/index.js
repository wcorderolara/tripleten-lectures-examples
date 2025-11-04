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
    taskText.setAttribute('data-task-id', taskCounter);
    
    taskList.appendChild(taskText);
    clearInput();
})

// DELETE FUNCTION
function deleteTask(idItem) {
    const itemToDelete = document.querySelector(`.task-item[data-task-id="${idItem}"]`);
    if(itemToDelete) {
        itemToDelete.remove();
    }
}

// CLEAR INPUT
function clearInput() {
    const inputTask = document.querySelector('#taskInput');
    inputTask.value = "";
    inputTask.focus();
}

// DELETE ALL TASKS
function deleteAllItems() {
    let taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach( function(task) {
        task.remove();
    })
}


// create an step by step list
/*
    1. create a container for my App
    2. create a div where I will place all my HTML
    3. create the input group.
        3.1 create the input text
        3.2 create a button to Add Tasks
    4. create an UL empty container for all my tasks
    5. Create a Listener for Add Tasks Button
        5.1 Select the input 
        5.2 get the value of the input
        5.3 Create an LI element to store the value of the input
        5.4 Append the LI element to the UL object
        5.5 Add the 'task-item' class to the LI element
        5.6 create the task-item CSS RULE
*/

/*
    inputs --> parameters
        what values do you will need
        what types you will need
        how many parameters you will need
        does anyone could be optional?
            place at the end of the list of paramters.

    operations --> define the logic of the function
        declare your local variables or constants
        identify the math operations or string operations, or
        whatever you need.
        store the return values into the variables

    outputs --> whether return or not anything
        What values you will return
        it's single or complex object
        

*/