//단순 ajax 테스트
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

//마지막에 추가해서 테스트
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

function searchNews(request, response, next) {
  const keyword = request.params.keyword;
  axios
    .get(`https://newsapi.org/v2/everything?q=${keyword}`, {
      headers: { Authorization: "83e3eaac23724c9887f1f8af227c439f" },
    })
    .then((res) => {
      const result = JSON.stringify(res.data);

      if (!result) {
        response.json({ status: 500, msg: "server error" });
      } else {
        response.json({ status: 200, result: JSON.parse(result) });
      }
    });
}

app.get("/search/:keyword?", searchNews);

app.post("/post_test", (request, response, next) => {
  console.log(request.body);
  response.json({ status: 200, msg: "post request success" });
});
app.get("/get_test", (request, response, next) => {
  console.log(request.query);
  response.json({ status: 200, msg: "get_test request success" });
});

app.get("/text_test", (request, response, next) => {
  console.log(`text_test, ${request.headers["accept"]}`);
  response.send("text_test request success");
});

app.listen(PORT, () => {
  console.log(`1 listening at http://localhost:${PORT}`);
});
