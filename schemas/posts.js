const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  
  user:{
    type:String
  },
  password:{
    type:String
  },
  title:{
    type:String,

  },
  content:{
    type:String
  },
  createdAt:{//생성날짜
    type:String,
  }
});

module.exports = mongoose.model("Posts", postsSchema);//콜렉션 명,데이터가생성될스키마의값