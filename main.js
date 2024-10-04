"use strict";
// interface Article {
//   author: string;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
// }

const resultNode = document.querySelector("#result");
const keywordNode = document.querySelector("#keyword");

function search() {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "get",
    `http://localhost:3000/search${keywordNode.value || ""}`,
    true
  );

  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.dir(data.result.articles);
      console.log(data.result.articles);

      data.result.articles.forEach((article) => {
        resultNode.innerHTML += `
          <li class="article">
          ${(() => {
            if (article.urlToImage) {
              return `<img class="thumb" src="${article.urlToImage}" />`;
            } else {
              return "<img class='thumb' src='https://via.placeholder.com/160' />";
            }
          })()}
            
            <div class="article-info">
              <h2>${article.title}</h2>
              <p>${article.author ? article.author : ""}</p>
              <p class="des">${article.description}</p>
              <a href="${article.url}">Read more</a>
            </div>
          </li>
        `;
      });
    }
  };
}
