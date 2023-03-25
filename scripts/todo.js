"use strict";
// kích hoạt khi đăng nhập
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputtask = document.getElementById("input-task");
  const arrActive = getFromStorage("userActive");
  displayTodoList();
  // hiển thị các thông tin danh sách todo (todo list )
  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner == userActive.username)
      //lọc ra tên user name người tạo ra task , username sẽ lấy theo user hiện đang login vào hệ thống
      .forEach((todo) => {
        //duyệt mảng todoarr rồi in ra
        html += `
    <li  class=${todo.isdone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>`;
      });
    todoList.innerHTML = html;
    eventToggleTasks();
    DeleteTask();
  }
  //  bắt sự kiện khi click
  btnAdd.addEventListener("click", function () {
    // console.log(" click");
    for (let i = 0; i < todoArr.length; i++) {
      if (
        todoArr[i].task === inputtask.value &&
        todoArr[i].owner === arrActive.username
      ) {
        alert(`đã tồn tại task : ${inputtask.value}`);
        inputtask.value = "";
        throw new Error(`đã tồn tại task : ${inputtask.value}`);
      }
    }
    if (inputtask.value.trim().length === 0) {
      alert("vui lòng nhập vào task ");
    } else {
      const task = new Task(inputtask.value, userActive.username, false);
      //push task mới vào mảng
      todoArr.push(task);
      saveToStorage("todoTask", todoArr);
      console.log(todoArr);
      // gọi hàm để hiển thị
      displayTodoList();
      inputtask.value = ""; // reset dữ liêu từ form nhập
    }
  });

  function eventToggleTasks() {
    document.querySelectorAll("#todo-list li").forEach(function (li) {
      // thêm sự kiện vào các danh sách
      li.addEventListener("click", function (e) {
        // console.log(" click");
        if (e.target !== li.children[0]) {
          li.classList.toggle("checked");
        }
        const todo = todoArr.find(
          (todoItem) =>
            todoItem.owner === userActive.username &&
            todoItem.task === li.textContent.slice(0, -1)
        );
        // thay đổi thuộc tính is done
        todo.isdone = li.classList.contains("checked") ? true : false;
        saveToStorage("todoTask", todoArr);
      });
    });
  }

  function DeleteTask() {
    // xóa task ra khỏi dữ liệu
    document.querySelectorAll("#todo-list .close").forEach(function (close) {
      close.addEventListener("click", function (e) {
        // console.log(" click");
        const isdelete = confirm("Bạn Chắc Chắn Điều Này");
        if (isdelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === close.parentElement.textContent.slice(0, -1)
          );
          todoArr.splice(index, 1);
          saveToStorage("todoTask", todoArr);
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("vui lòng đăng nhập ");
}
