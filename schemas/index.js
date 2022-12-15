const mongoose = require("mongoose");//몽구수 패키지에 있는것을 가져와 변수에 할당


const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/myproject")//몽고디비와 연결
    .catch(err => console.log(err));//에러발생하면 err이란 변수에 받아올거다.
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;