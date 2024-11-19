const tasks = [];

const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const hideCompletedBtn = document.getElementById('hide-completed');

/**
 * @param {Task} task 
 */
function addTaskElement (task) {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
        <input type="checkbox" class="task-complete" />
        ${task.name}
        <span class="task-options-container">
            &#xFE19;
            <span class="task-options">
                <div class="task-delete">Delete</div>
                <hr>
                <div class="toggle-priority">Toggle High Priority</div>
            </span>
        </span>
    `;

    const toggleComplete = taskElement.querySelector('.task-complete');
    const togglePriority = taskElement.querySelector('.toggle-priority');
    const deleteTask = taskElement.querySelector('.task-delete');

    // COMPLETE
    toggleComplete.addEventListener('change', () => {
        task.complete = toggleComplete.checked;
        if (task.complete) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
    });

    // PRIORITY
    togglePriority.addEventListener('click', () => {
        task.priority = !task.priority;
        reorderTasks();
    });

    deleteTask.addEventListener('click', () => {
        tasks.splice(tasks.indexOf(task), 1);
        taskElement.remove();
    });

    if (task.complete) {
        toggleComplete.checked = true;
        taskElement.classList.add('completed');
    }

    if (task.priority) {
        taskElement.classList.add('prioritized');
    }

    taskList.appendChild(taskElement);
}

function addTaskBtnClicked () {
    const newTaskName = newTaskInput.value;
    const newTask = {
        name: newTaskName,
        complete: false,
        priority: false
    };
    tasks.push(newTask);
    addTaskElement(newTask);
    newTaskInput.value = '';
}

function reorderTasks () {
    tasks.sort((a, b) => {
        if (a.priority && !b.priority) {
            return -1;
        } else if (!a.priority && b.priority) {
            return 1;
        } else {
            return 0;
        }
    });

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    for (const task of tasks) {
        addTaskElement(task);
    }
}

addTaskBtn.addEventListener('click', addTaskBtnClicked);

function toggleHideCompleted () {
    taskList.classList.toggle('hide-completed');
}
hideCompletedBtn.addEventListener('click', toggleHideCompleted);

newTaskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTaskBtnClicked();
    }
})

const sampleTasks = [
    { name: 'Sample Task', complete: false, priority: false }, 
    { name: 'Priorirized Task', complete: false, priority: true },
    { name: 'Completed Task', complete: true, priority: false }, 
];

for (const task of sampleTasks) {
    tasks.push(task);
}
reorderTasks();