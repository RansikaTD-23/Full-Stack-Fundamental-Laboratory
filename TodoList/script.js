const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const taskCounter = document.getElementById("taskCounter");
const errorMsg = document.getElementById("errorMsg");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  taskList.innerHTML = "";

  const visibleTasks = tasks.filter(function (task) {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "list-group-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input mt-0";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm ms-auto";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  emptyMsg.style.display = visibleTasks.length === 0 ? "block" : "none";

  const remaining = tasks.filter(function (task) {
    return !task.completed;
  }).length;
  taskCounter.textContent = remaining + " remaining";

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    errorMsg.textContent = "Please enter a task. It cannot be empty.";
    taskInput.classList.add("is-invalid");
    return;
  }

  errorMsg.textContent = "";
  taskInput.classList.remove("is-invalid");

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

taskInput.addEventListener("input", function () {
  errorMsg.textContent = "";
  taskInput.classList.remove("is-invalid");
});

clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach(function (b) {
      b.classList.remove("btn-primary", "active");
      b.classList.add("btn-outline-primary");
    });
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-primary", "active");

    renderTasks();
  });
});

renderTasks();