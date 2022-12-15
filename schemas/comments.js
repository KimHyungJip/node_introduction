const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postId: {
    type: String,
  },
  user:{
    type:String,
  },
  password:{
    type:String,
  },
  content:{
    type:String,

  },
  createdAt:{//생성날짜
    type:String,
  }
});

module.exports = mongoose.model("Comments", commentsSchema);//콜렉션 명,데이터가생성될스키마의값