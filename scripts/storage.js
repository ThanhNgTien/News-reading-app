"use strict";
// mục này làm trước khi vào mục register để tạo dữ liệu storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
} // Lấy dữ liệu mục này sẽ viết trước savetostorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// lấy dữ liệu usearr từ localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

const userArr = users.map(function (user) {
  return parseUser(user);
});
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

// todo list
let todos = getFromStorage("todoTask") ? getFromStorage("todoTask") : [];
const todoArr = todos.map(function (user) {
  return parseTodoTask(user);
});
saveToStorage("todoTask", todoArr);
console.log(todoArr);

function parseTodoTask(taskdata) {
  const user = new Task(taskdata.task, taskdata.owner, taskdata.isdone);
  return user;
}
