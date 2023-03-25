"use strict";

// kích hoạt các chức năng khi đăng nhập
const arrActive = getFromStorage("userActive");
console.log(userActive);
if (userActive) {
  getDataNews("us", 1, arrActive.category, arrActive.pagesize);
  // hiển thị bài viết
  const prev = document.getElementById("btn-prev");
  const next = document.getElementById("btn-next");
  const num = document.getElementById("page-num");
  const container = document.getElementById("news-container");
  let totalResults = 0;
  async function getDataNews(country, page, category, pageSize) {
    console.log(pageSize);
    console.log(category);
    console.log(page);
    console.log(country);

    try {
      // gọi API
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&category=${category}&apiKey=dc4389f879804f57aade0926b7f80ac2`
      );
      const data = await res.json();

      console.log(data);
      displayNewList(data);
    } catch (err) {
      console.log(err);
      alert("đã bị lỗi");
    }
  }
  //event next và prev
  next.addEventListener("click", function () {
    getDataNews(
      "us",
      ++num.textContent,
      arrActive.category,
      arrActive.pagesize
    );
  });
  console.log();
  prev.addEventListener("click", function () {
    getDataNews(
      "us",
      --num.textContent,
      arrActive.category,
      arrActive.pagesize
    );
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
    container.innerHTML = html;
  }

  function checkPrev() {
    if (num.textContent == 1) {
      prev.style.display = "none";
    } else {
      prev.style.display = "block";
    }
  }
  function checkNext() {
    console.log(num.textContent);
    if (num.textContent === Math.ceil(totalResults)) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }
} else {
  ("vui lòng đăng nhập vào tài khoản");
  window.location.assign("../index.html");
}
