"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const Logout = document.getElementById("btn-logout");

displayhome();

// hiển thị nội dung trang home tên đang đăng nhập

function displayhome() {
  console.log(userActive);
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
// chức năng log out
Logout.addEventListener("click", function () {
  const isLogout = confirm("bạn có muốn Logout không ??");
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayhome();
  }
});
