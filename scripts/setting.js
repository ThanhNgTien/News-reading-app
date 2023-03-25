"use strict";
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const saveSetting = document.getElementById("btn-submit");
const arrActive = getFromStorage("userActive");
saveSetting.addEventListener("click", function () {
  if (validate()) {
    // console.log(" click");
    userActive.pagesize = Number.parseInt(inputPageSize.value);
    userActive.category = inputCategory.value;
    // saveToStorage("userArr", userArr);
    // console.log(userArr);
    saveToStorage("userActive", userActive);
    console.log(userActive);
    alert("đã hoàn thành");
    inputPageSize.value = userActive.pagesize;
    inputCategory.value = userActive.category;
  }
});
inputPageSize.value = arrActive.pagesize;
inputCategory.value = arrActive.category;
// console.log(arrActive);
function validate() {
  let isvalidate = true;
  if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
    alert(" Vui lòng chọn số tin trong mỗi trang ");
    isvalidate = false;
  }
  if (inputCategory.value === "General") {
    alert("Vui lòng chọn Category ");
    isvalidate = false;
  }
  return isvalidate;
}
