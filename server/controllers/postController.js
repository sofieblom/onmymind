const User = require("../models/UserModel.js");
const Post = require("../models/PostModel.js");

const newPost = async (req, res) => {
    console.log("req BODY",req.body)
    if(!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const post = await Post.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        creationDate: req.body.creationDate
    })

    post.save().then(post => res.json({
        message: "NEW POST",
        post
    })).catch(err => console.log(err))
   
}

const getPosts = async (req, res) => {
    const posts = await Post.find( { user: req.user.id});
    if(posts) {
        console.log("WO INLÄGG")
        res.send(posts)
    }else{
        res.status(400)
        throw new Error('Got no posts')
    }
    
}

const getSinglePost = async (req,res) => {
    const id = req.params.id;
    const post = await Post.findById( {_id: id})
    console.log(post)
    res.send(post)
}

const editPost = async (req, res) => {
    const id = req.params.id;
    await Post.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            title: req.body.title,
            content: req.body.content,
            creationDate: req.body.creationDate
        }
    );
    res.redirect("http://localhost:3000/post/", _id)
}

module.exports = {getPosts, newPost, getSinglePost, editPost}