"use strict";
const keywordNode = document.getElementById("keyword");
const resultNode = document.getElementById("result");

function search() {
  const xhr = new XMLHttpRequest();

  xhr.open("get", `http://localhost:3000/search/${keywordNode.value}`, true);

  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.dir(data);

      // resultNode.innerHTML = data.result;
    }
  };
}
