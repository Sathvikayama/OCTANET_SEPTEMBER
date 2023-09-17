var tasks = [];

function addTask(event) {
    event.preventDefault();

    var taskInput = document.querySelector(".newtask");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        updateTaskList();
        taskInput.value = "";
    }
}

function updateTaskList() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        li.className = "task-item";

        var taskTextElement = document.createElement("input");
        taskTextElement.type = "text";
        taskTextElement.className = "task-title";
        taskTextElement.value = task.text;
        taskTextElement.addEventListener("input", function () {
            updateTaskText(index, taskTextElement.value);
        });

        if (task.completed) {
            taskTextElement.classList.add("completed");
        }

        li.appendChild(taskTextElement);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", function () {
            deleteTask(index);
        });

        var toggleCompleteButton = document.createElement("button");
        toggleCompleteButton.textContent = task.completed ? "Undo" : "Complete";
        toggleCompleteButton.className = "complete-btn";
        if (task.completed) {
            toggleCompleteButton.classList.add("completed");
        }
        toggleCompleteButton.addEventListener("click", function () {
            toggleCompleteTask(index);
        });

        li.appendChild(deleteButton);
        li.appendChild(toggleCompleteButton);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function toggleCompleteTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function updateTaskText(index, newText) {
    tasks[index].text = newText;
}

document.querySelector("#task-form").addEventListener("submit", addTask);
document.querySelector(".newtask").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask(event);
    }
});

updateTaskList();
