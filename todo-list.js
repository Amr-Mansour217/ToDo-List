let tasks = [
    {
        "title": "e",
        "date": "2024/8/22",
        "isDone": false
    },
]
function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    if(retrievedTasks == null){
        tasks = []
    }else {
        tasks = retrievedTasks
    }
}
getTasksFromStorage()
function fillTaskOnThePage(){
    document.getElementById("tasks").innerHTML = ""
    let index = 0
    for (task of tasks){
        let content = 
            `
                <div class="tasks" id="tasks">
                    <div class="task ${task.isDone ? 'done' : ''}">
                        <div class="text">
                            <h2>${task.title}</h2>
                            <div class="task-text">
                                <span class="material-symbols-outlined">calendar_month</span>
                                <span>${task.date}</span>
                            </div>
                        </div>
                        <div class="btns">
                            <button onclick="deleteTask(${index})" class="btn" id="delete">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                            ${task.isDone ? `
                                <button onclick="completeTask(${index})" class="btn middle-btn" id="check" style="background-color: rgb(118, 0, 101)">
                                    <span class="material-symbols-outlined">cancel</span>
                                </button>
                                ` : `
                                <button onclick="completeTask(${index})" class="btn middle-btn" id="check">
                                    <span class="material-symbols-outlined">check</span>
                                </button>
                            `}
                            <button onclick="updateTask(${index})" class="btn" id="edit">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            `
        document.getElementById("tasks").innerHTML += content
        index++
    }
}

fillTaskOnThePage()
document.getElementById("addBtn").addEventListener("click", function(){
    let now = new Date()
    let date = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " | " + now.getHours() + ":" + now.getMinutes();
    let taskName = prompt("What's the task name?")
    let taskObj = {
        "title": taskName,
        "date": date,
        "isDone": false
    }
    tasks.push(taskObj)
    fillTaskOnThePage()
})

function deleteTask(index){
    let task = tasks[index]
    let isConfirmed = confirm("Are you sure you want to delete " + task.title + "?")
    if (isConfirmed){
        tasks.splice(index, 1)
        fillTaskOnThePage()
        storeTasks()
    }
}

function updateTask(index){
    let task = tasks[index]
    let taskEdit = prompt("Update the task name", task.title)
    task.title = taskEdit
    storeTasks()
    fillTaskOnThePage()
}

function completeTask(index){
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillTaskOnThePage()
}
function storeTasks(){
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksString)
}