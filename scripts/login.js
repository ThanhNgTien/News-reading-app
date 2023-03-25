"use strict";
// chức năng login

const login = document.getElementById("btn-submit");
const inputPassword = document.getElementById("input-password");
const inputUsername = document.getElementById("input-username");
saveToStorage("userArr", userArr);
login.addEventListener("click", function () {
  const isvalidate = validate();
  if (isvalidate) {
    // tìm kiếm trong dữ liệu có user name và password hay không
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      //nếu user có dữ liêu đúng đang nhập thì
      alert("bạn đăng nhập thành công ");
      saveToStorage("userActive", user); // lưu dũ liệu user
      window.location.assign("../index.html");
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại");
    }
    return user;
  }
});
// kiểm tra user và password
function validate() {
  let isvalidate = true;
  if (inputUsername.value.trim() === "") {
    alert("Tài khoản không được để trống");
    isvalidate = false;
  }
  if (inputPassword.value === "") {
    alert(" Mật khẩu không được để trống");
    isvalidate = false;
  }
  return isvalidate;
}
