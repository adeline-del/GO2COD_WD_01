document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

let tasks = [];

// Save tasks to local storage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add a new task with validation
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (!text) {
    // Display error message inside input box by adding the "error" class
    taskInput.classList.add("error");
    taskInput.placeholder = "Please enter a task"; 
    return;
  }

  // Clear error state if input is valid
  taskInput.classList.remove("error");
  taskInput.placeholder = "Enter your task"; 

  tasks.push({ text: text, completed: false });
  taskInput.value = ""; 
  updateTasksList();
  updateStats();
  saveTasks();
};

// Toggle task complete/incomplete
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

// Delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

// Edit a task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

    // Remove the task being edited
  tasks.splice(index, 1); 
  updateTasksList();
  updateStats();
  saveTasks();
};

// Update stats and progress bar
const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;
  document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
    rainConfetti();
  }
};

// Update and render the task list
const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" onclick="editTask(${index})" alt="Edit" />
          <img src="./img/bin.png" onclick="deleteTask(${index})" alt="Delete" />
        </div>
      </div>
    `;

    listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

// Add task on button click
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); 
  addTask();
});

// Confetti effect for task completion
const rainConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ["emoji"],
      shapeOptions: {
        emoji: {
          value: ["🦄", "🌈"],
        },
      },
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};
