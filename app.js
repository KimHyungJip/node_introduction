const express = require('express');//express 라이브러리를 가지고와서 변수에 넣고
const app = express();//express실행 app객체를 만들어
const port = 3000;//3000번포트로 접근했을때만 서버실행

const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const connect = require("./schemas");//index.js
connect();

app.use(express.json());
app.use("/",[postsRouter,commentRouter]);




app.listen(port, () => {//app객체로 서버를 열어봐
    console.log(port, '포트로 서버가 열렸어요!');
});
