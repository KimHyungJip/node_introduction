const express = require("express");
const router = express.Router();//express안에있는router함수의 결과값을 변수에 할당
const Comments = require("../schemas/comments.js");
const Posts = require("../schemas/posts.js");
const ObjectId = require('mongodb').ObjectId;

// //comments/:_id
// router.post("/comments/:_id", async (req,res)=>{
//     console.log("1");
//     const {user,password,content} = req.body;
//     const createdAt= JSON.stringify(new Date());    
//     // if(!content.length){
//     //     return res.status(400).json({
//     //         success:false,
//     //         errorMessage:"댓글 내용을 입력해주세요."
//     //     }); 
//     // }
//     const comments = await Comments.find({user});

//     // if (comments.length){
//     //     return res.status(404).json({
//     //         success:false,
//     //         errorMessage:"데이터 형식이 올바르지 않습니다."
//     //     });
//     // }
//     const createdComments = await Comments.create({user,password,content,createdAt});

//     res.json({result:"success",comments:createdComments,message:"댓글을 생성"});
// })

module.exports = router;