const express = require("express");
const router = express.Router();//express안에있는router함수의 결과값을 변수에 할당
const Posts = require("../schemas/posts.js");
const Comments = require("../schemas/comments.js");
const ObjectId = require('mongodb').ObjectId;

// const posts = [
//     {
//         "postId": "62d6d12cd88cadd496a9e54e",
//         "user": "Developer",
//         "title": "안녕하세요",
//         "createdAt": "2022-07-19T15:43:40.266Z"
//     },
//     {
//         "postId": "62d6cc66e28b7aff02e82954",
//         "user": "Developer",
//         "title": "안녕하세요",
//         "createdAt": "2022-07-19T15:23:18.433Z"
//     }
// ]

//게시글 조회
router.get("/posts", async (req, res) => {//2가지 정보를 가진 화살표 함수 만들기
    const posts = await Posts.find({},{user:1,title:1,createdAt:1});  
    const a=posts.reverse();
    res.json({a})//어떤상태코드로 반환되는지 확인 가능
});

//게시글 상세조회 api _id로 상세조회 할꺼야
router.get("/posts/:_id", async (req, res) => {
    try{
        const postsId = req.params._id;   
        const posts = await Posts.find({_id : ObjectId(req.params._id)},{user:1,title:1,content:1,createdAt:1});
        res.status(200).json({posts});
    } catch(err){
        res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다.",
        });
    }
})


router.post("/posts", async (req,res)=>{
    const {user,password,title,content} = req.body;
    const createdAt= JSON.stringify(new Date());    
    
    now = new Date();
    const posts = await Posts.find({user});

    if (posts.length){
        return res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다."
        });
    }
    const createdPosts = await Posts.create({user,password,title,content,createdAt});

    res.json({posts:createdPosts,message:"게시글을 수정하였습니다"});
})

router.put("/posts/:_id",async(req,res)=>{
    try{
        const postsId = req.params._id;
        const a = req.body;
        const title = a.title;
        const content = a.content;
        const posts = await Posts.find({_id : ObjectId(req.params._id)});

        const existPosts= await Posts.find({postsId});
        if(existPosts.length){
            if(a.password==posts[0].password){
                await Posts.updateOne(
                    {_id:postsId},
                    {$set:{title:title,content:content}}
                )
                res.status(200).json({success:true,message:"게시글을 수정하였습니다"});//석세스 무조건 트루
            } else{
                return res.json({success:false,errorMessage:"password오류"});
            }
        } else{
            return res.status(404).json({
                success:false,
                errorMessage:"게시글 조회에 실패하였습니다."
            });
        }
    } catch(err){
        return res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다."
            });
    }
})

router.delete("/posts/:_id",async(req,res)=>{
    try{
        const postsId = req.params._id;
        const posts = await Posts.find({_id : ObjectId(req.params._id)});
        const a = req.body;
        const existPosts= await Posts.find({postsId});
        if(existPosts.length){
            if(a.password==posts[0].password){
                await Posts.deleteOne({_id:postsId});
                res.status(200).json({success:true,message:"게시글을 삭제하였습니다"});//석세스 무조건 트루
            } else{
                return res.json({success:false,errorMessage:"password오류"});
            }
        } else{
            return res.status(404).json({
                success:false,
                errorMessage:"게시글 조회에 실패하였습니다."
            });
        }
    }catch(err){
        return res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다."
            });
    }
})

//comments/:_id
router.post("/posts/:_id/comments", async (req,res)=>{
    const {user,password,content} = req.body;
    const {_id:postId}=req.params;
    const createdAt= JSON.stringify(new Date());  
    console.log(req.params);  
    // if(!content.length){
    //     return res.status(400).json({
    //         success:false,
    //         errorMessage:"댓글 내용을 입력해주세요."
    //     }); 
    // }
    //const comments = await Comments.find({user});

    // if (comments.length){
    //     return res.status(404).json({
    //         success:false,
    //         errorMessage:"데이터 형식이 올바르지 않습니다."
    //     });
    // }
    const createdComments = await Comments.create({user,password,content,createdAt,postId});

    res.json({comments:createdComments,message:"댓글을 생성"});
})
router.get("/posts/:_id/comments", async (req, res) => {//2가지 정보를 가진 화살표 함수 만들기
    const comments = await Comments.find({});
    const a = comments.reverse();
    res.json({a})//어떤상태코드로 반환되는지 확인 가능
});

router.put("/posts/:_id/comments/:_id",async(req,res)=>{
    try{
        const commentsId = req.params._id; 
        const a = req.body;//패스워드랑 콘텐트 받음 바디에서 
        const content = a.content;
        const comments = await Comments.find({_id : ObjectId(req.params._id)});
        const existComments= await Comments.find({commentsId});
        if(existComments.length){
            if(a.password==comments[0].password){
                await Comments.updateOne(
                    {_id:commentsId},
                    {$set:{content:content}}
                )
                res.status(200).json({success:true,message:"댓글을 수정하였습니다"});//석세스 무조건 트루
            } else{
                return res.json({success:false,errorMessage:"password오류"});
            }
        } else{
            return res.status(404).json({
                success:false,
                errorMessage:"댓글 조회에 실패하였습니다."
            });
        }
    } catch(err){
        return res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다."
            });
    }
})
router.delete("/posts/:_id/comments/:_id",async(req,res)=>{
    try{
        const commentsId = req.params._id;
        const comments = await Comments.find({_id : ObjectId(req.params._id)});
        const a = req.body;
        const existComments= await Comments.find({commentsId});
        if(existComments.length){
            if(a.password==comments[0].password){
                await Comments.deleteOne({_id:commentsId});
                res.status(200).json({success:true,message:"댓글을 삭제하였습니다"});//석세스 무조건 트루
            } else{
                return res.json({success:false,errorMessage:"password오류"});
            }
        } else{
            return res.status(404).json({
                success:false,
                errorMessage:"댓글 조회에 실패하였습니다."
            });
        }
    }catch(err){
        return res.status(400).json({
            success:false,
            errorMessage:"데이터 형식이 올바르지 않습니다."
            });
    }
})


//라우터라는 변수를 밖으로 내보냄 module.export통해서
module.exports = router;