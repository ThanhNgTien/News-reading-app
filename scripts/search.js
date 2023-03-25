"use strict";

// kích hoạt các chức năng khi đăng nhập
const arrActive = getFromStorage("userActive");
console.log(userActive);
if (userActive) {
  const btnSubmit = document.getElementById("btn-submit");
  const prev = document.getElementById("btn-prev");
  const next = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");
  const newsContainer = document.getElementById("news-container");
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");

  let totalResults = 0;
  let key = "";

  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("vui lòng nhập từ khóa tìm kiếm");
    } else {
      key = inputQuery.value;
      getDataNewsByKey(key, 1, arrActive.pagesize);
    }
  });

  async function getDataNewsByKey(key, page, pageSize) {
    // console.log(pageSize);
    // console.log(category);
    // console.log(page);
    // console.log(country);

    try {
      // gọi API
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${key}&sortBy=relevancy&page=${page}&pageSize=${pageSize}&apiKey=dc4389f879804f57aade0926b7f80ac2`
      );
      const data = await res.json();

      // let pageNumMax = Math.floor(data.totalResults / arrActive.pagesize + 1);
      // if (pageNum.textContent > pageNumMax) {
      //   // navPageNum.style.display = "none";
      //   throw new Error("đã hết news");
      // }
      //thông báo khi không có bài viết nào
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error("không có kết quả tìm kiếm phù hợp");
      }
      navPageNum.style.display = "block";
      console.log(data);
      displayNewList(data);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  //event next và prev
  next.addEventListener("click", function () {
    getDataNewsByKey(key, ++pageNum.textContent, arrActive.pagesize);
  });
  console.log();
  prev.addEventListener("click", function () {
    getDataNewsByKey(key, --pageNum.textContent, arrActive.pagesize);
  });

  function displayNewList(data) {
    totalResults = data.totalResults;
    checkPrev();
    checkNext();
    let html = ""; // tạo một chuỗi rỗng , để các new hiển thị
    data.articles.forEach(function (data) {
      html += `
        <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${data.urlToImage}" class="card-img"
                        alt="img
                        ">
                </div>
                <div class="col-md-8">
                    <div class="card flex-row flex-wrap" c >
                        <div class="card-img" class="p-4 p-md-5 pt-5">
                            
                        </div>
                            
                            <div  class="card-body">
                            <h4  class="card-title"> ${data.title}</h4>
                            <p class="card-text"> ${data.description}</p>
                            
                                <a href="${data.url}" target="_blank" class="btn btn-primary" >View</a>
                            
                            </div>
                     </div>
                </div>
            </div>
        </div>
    </div>`;
    });
    newsContainer.innerHTML = html;
  }

  function checkPrev() {
    if (pageNum.textContent == 1) {
      prev.style.display = "none";
    } else {
      prev.style.display = "block";
    }
  }
  function checkNext() {
    // console.log(pageNum.textContent);
    // console.log(Math.ceil(totalResults / arrActive.pagesize));
    if (pageNum.textContent > Math.ceil(totalResults / arrActive.pagesize)) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }
} else {
  ("vui lòng đăng nhập vào tài khoản");
  window.location.assign("../index.html");
}
