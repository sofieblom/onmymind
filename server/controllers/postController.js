const User = require("../models/UserModel.js");
const Post = require("../models/PostModel.js");

// Create new post
const newPost = async (req, res) => {

    if(!req.body.title || !req.body.content || !req.body.creationDate) {
     res.status(400)
     throw new Error('Please enter all fields')
    }
    try{
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
    }catch(error){
        console.log(error)
    }
}

// Get all posts
const getPosts = async (req, res) => {

    try {
       const posts = await Post.find( { user: req.user.id});
    if(posts) {
        res.send(posts)
    }else{
        res.status(400)
        throw new Error('Got no posts')
    } 
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
    
}

// Get single post
const getSinglePost = async (req,res) => {

    try{
        const id = req.params.id;
        const post = await Post.findById( {_id: id})
    if(post) {
        res.send(post)
    } else {
        res.status(400).send()
    } 
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
  
}

// Edit single post
const editPost = async (req, res) => {
    const id = req.params.id;

   try {
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
        res.status(200).send()
   } catch(error) {
    console.log(error)
   }
}

// Delete post 
const deletePost = async (req, res) => {

    try{
        const id = req.params.id;

        await Post.findById(id).deleteOne()
        res.status(200).send()
    }catch(error){
        console.log(error)
    }
   
}

module.exports = {getPosts, newPost, getSinglePost, editPost, deletePost}