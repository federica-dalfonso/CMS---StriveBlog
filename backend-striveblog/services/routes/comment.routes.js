import { Router } from "express";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Author from "../models/author.model.js";
import { validateNewComment, validateModifyComment } from "../middleware/validate.comment.js";

export const commentRoute = Router();

// lista di tutti i commenti di un singolo post:
commentRoute.get("/blogPosts/:postId/comments", async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.postId).populate({
            path: "comments",
            populate: {
                path: "author",
                select: ["name", "surname", "avatar"],
            },
        });

        if (post) {
            res.status(200).send(post.comments);
        } else {
            let err = new Error("post not found!");
            err.status = 404;
            throw err;
        }    
        
    } catch (error) {
        next(error);   
    }
});

// get commento specifico di un post specifico:
commentRoute.get("/blogPosts/:postId/comments/:commentId", async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.postId);

        if(post) {
            const singleComment = await Comment.findById(req.params.commentId).populate("author", "name surname avatar");

            if(singleComment) {
                res.status(200).send(singleComment);
            } else {
                let err = new Error("comment not found");
                err.status = 404;
                throw err;
            }            
        } else {
            let err = new Error("post not found");
            err.status = 404;
            throw err;
        }        
        
    } catch (error) {
        next(error);
    }
});

// post nuovo commento ad un post specifico:
commentRoute.post("/blogPosts/:postId", validateNewComment, async (req, res, next) => {
    try {
        const newComment = await Comment.create({
            author: req.body.author,
            content: req.body.content,
        })

        //aggiungo il commento al post:
        let post = await Post.findById(req.params.postId);        
        if (post) {
            post.comments.push(newComment._id);
            await post.save();
            res.send(newComment);

        } else {
            let err = new Error("post not found");
            err.status = 404;
            throw err;
        };
        
        //aggiungo il commento all'autore:
        let author = await Author.findById(req.user.id);
        author.comments.push(newComment._id);
        await author.save();

    } catch (error) {
        next(error);
    }
});

// put modifica del commento specifico: 
commentRoute.put("/blogPosts/:postId/comment/:commentId", validateModifyComment, async (req, res, next) => {
    try {
 
        const post = await Post.findById(req.params.postId);

        if(post) {
            const singleComment = await Comment.findById(req.params.commentId);

            if(singleComment) {
                
                for (let key in req.body) {
                    singleComment[key] = req.body[key];
                }                
                await singleComment.save();
                res.status(200).send(singleComment);
                                                      
            } else {
                let err = new Error("comment not found!");
                err.status = 404;
                throw err;
            }            
            } else {
                let err = new Error("post not found");
                err.status = 404;
                throw err;
            }
    } catch (error) {
        next(error);
    }
});

// delete del commento specifico:
commentRoute.delete("/blogPosts/:postId/comment/:commentId", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if(post) {

            const singleComment = await Comment.findById(req.params.commentId);

            if(singleComment) {
                //elimino il commento dall'array di commenti:
                post.comments.pull(singleComment);
                await post.save();
                //lo elimino anche dal database perché non voglio conservarlo:
                await Comment.deleteOne({_id: req.params.commentId});
                res.sendStatus(204);
            } else {
                let err = new Error("comment not found!");
                err.status = 404;
                throw err;
            }
        } else {
            let err = new Error("post not found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        next(error);
    }
});