"use strict";

const inputBox = document.querySelector("#input-box");
const theList = document.querySelector("#unordered-list");

const addTask = () => {
  if (inputBox.value !== "") {
    const listItem = document.createElement("li");
    listItem.innerText = inputBox.value;
    theList.append(listItem);
    const deleteTask = document.createElement("span");
    deleteTask.innerText = "✕";
    listItem.append(deleteTask);
  }
  inputBox.value = "";
  save();
};

theList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    save();
  } else if (target.tagName === "SPAN") {
    target.parentElement.remove();
    save();
  }
});

const save = () => {
  localStorage.setItem("task", theList.innerHTML);
};

const showTasks = () => {
  theList.innerHTML = localStorage.getItem("task");
};

showTasks();
