"use strict";

const inputBox = document.querySelector("#input-box");
const theList = document.querySelector("#unordered-list");
const searchBox = document.querySelector("#search-box");
const deleteDialog = document.querySelector("#delete-dialog");
const taskContent = document.querySelector("#task-content");
const confirmDelete = document.querySelector("#confirm-delete");
const cancelDelete = document.querySelector("#cancel-delete");
const undoButton = document.querySelector("#undo-button");

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}.${month}.${year}`;

let taskToDelete;
let deletedTasks = [];

const createListItem = (text) => {
  const listItem = document.createElement("li");
  listItem.innerText = text;
  const deleteTask = document.createElement("span");
  deleteTask.innerText = "x";
  listItem.append(deleteTask);
  return listItem;
};

const addTask = () => {
  if (inputBox.value !== "") {
    const listItem = createListItem(inputBox.value);
    theList.append(listItem);
    save();
  }
  inputBox.value = "";
};

const restoreTask = () => {
  if (deletedTasks.length > 0) {
    const lastDeletedTask = deletedTasks.pop();
    const listItem = createListItem(lastDeletedTask.content.trim());
    theList.append(listItem);
    deletedTasks = [];
    save();
  }
};

const filterTasks = () => {
  const filter = searchBox.value.trim().toLowerCase();
  const tasks = theList.getElementsByTagName("li");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i].innerText.toLowerCase();

    if (filter === "") {
      tasks[i].style.display = "";
    } else {
      if (task.includes(filter)) {
        tasks[i].style.display = "";
      } else {
        tasks[i].style.display = "none";
      }
    }
  }
};

const moveToTrash = (task) => {
  const dateElement = task.querySelector(".date-completed");
  const deletedTask = {
    content: dateElement
      ? task.innerText.slice(0, -dateElement.innerText.length - 2)
      : task.innerText.slice(0, -1),
  };
  deletedTasks.push(deletedTask);
  task.remove();
  save();
};

theList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    if (target.classList.contains("checked")) {
      const dateElement = document.createElement("div");
      dateElement.className = "date-completed";
      dateElement.innerText = `${currentDate}`;
      target.appendChild(dateElement);
    } else {
      const dateElement = target.querySelector(".date-completed");
      if (dateElement) {
        dateElement.remove();
      }
    }
    save();
  } else if (target.tagName === "SPAN") {
    taskToDelete = target.parentElement;
    const dateElement = taskToDelete.querySelector(".date-completed");
    if (dateElement) {
      taskContent.innerText = taskToDelete.innerText.slice(
        0,
        -dateElement.innerText.length - 2
      );
    } else {
      taskContent.innerText = taskToDelete.innerText.slice(0, -1);
    }
    deleteDialog.showModal();
  }
});

confirmDelete.addEventListener("click", () => {
  if (taskToDelete) {
    moveToTrash(taskToDelete);
    deleteDialog.close();
    console.log(deletedTasks);
  }
});

cancelDelete.addEventListener("click", () => {
  deleteDialog.close();
});

undoButton.addEventListener("click", () => {
  restoreTask();
});

searchBox.addEventListener("input", filterTasks);

const save = () => {
  localStorage.setItem("task", theList.innerHTML);
  localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
};

const showTasks = () => {
  const storedTasks = localStorage.getItem("task");
  if (storedTasks) {
    theList.innerHTML = storedTasks;
  }
};

showTasks();
