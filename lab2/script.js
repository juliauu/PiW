"use strict";

const inputBox = document.querySelector("#input-box");
const theList = document.querySelector("#unordered-list");
const searchBox = document.querySelector("#search-box");
const deleteDialog = document.querySelector("#delete-dialog");
const taskContent = document.querySelector("#task-content");
const confirmDelete = document.querySelector("#confirm-delete");
const cancelDelete = document.querySelector("#cancel-delete");

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}.${month}.${year}`;

let taskToDelete;

const addTask = () => {
  if (inputBox.value !== "") {
    const listItem = document.createElement("li");
    listItem.innerText = inputBox.value;
    const deleteTask = document.createElement("span");
    deleteTask.innerText = "x";
    listItem.append(deleteTask);
    theList.append(listItem);
    save();
  }
  inputBox.value = "";
};

const filterTasks = () => {
  const filter = searchBox.value.toLowerCase();
  const tasks = theList.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i].innerText.toLowerCase();
    if (task.includes(filter)) {
      tasks[i].style.display = "";
    } else {
      tasks[i].style.display = "none";
    }
  }
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
    taskToDelete.remove();
    save();
    deleteDialog.close();
  }
});

cancelDelete.addEventListener("click", () => {
  deleteDialog.close();
});

searchBox.addEventListener("input", filterTasks);

const save = () => {
  localStorage.setItem("task", theList.innerHTML);
};

const showTasks = () => {
  const storedTasks = localStorage.getItem("task");
  if (storedTasks) {
    theList.innerHTML = storedTasks;
  }
};

showTasks();
