import { Router } from "express";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Author from "../models/author.model.js";
import { validateNewPost, validateModifyPost } from "../middleware/validate.blogPost.js";
import { postUpload } from '../middleware/multer.cloudinary.js';

export const postRoute = Router();

// singolo post: 
postRoute.get("/blogPosts/:postId", async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.postId).populate("author", "-comments");
        if (post) {
            res.status(200).send(post);
        } else {
            let err = new Error("post not found!");
            err.status = 404;
            throw err;
        }        
    } catch (error) {
        next(error);
    }
}); 

//lista di post + eventuale query: 
postRoute.get("/blogPosts", async (req, res, next) => {
    try {
        let posts = await Post.find(
            //ricerca caseIns:
            req.query.title ? { title: { $regex: req.query.title, "$options": "i"  } } : {}
        ).populate("comments");
        res.status(200).send(posts);      
    } catch (error) {
        next(error);
    }
});

// nuovo post: 
postRoute.post("/blogPosts", validateNewPost, async (req, res, next) => {
    try {
        let post = await Post.create({
            ...req.body, 
            author: req.user._id,
        });

        //aggiungo il post all'autore: 
        let author = await Author.findById(req.user._id);
        author.posts.push(post._id);
        await author.save();

        res.status(201).send(post); 
    } catch (error) {
        next(error)
    }
});

// modifica articolo: 
postRoute.put("/blogPosts/:id", validateModifyPost, async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, 
                {new: true}            
        );

        res.status(200).send(updatedPost);

        } else {
           let err = new Error("post not found!");
            err.status = 404;
            throw err; 
        }       
    } catch (error) {
        next(error)
    }
});

// delete articolo:
postRoute.delete("/blogPosts/:id", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            //elimino anche i commenti collegati al post:
            await Comment.deleteMany({ post : req.params.id })
            
            // Rimuovo l'ID del post dall'array posts dell'autore
            let author = await Author.findById(post.author);
            author.posts.pull(req.params.id);
            await author.save();

            await Post.findByIdAndDelete(req.params.id);
            res.sendStatus(204);
        } else {
            let err = new Error("post not found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        next(error)
    }
});

// patch cover:
postRoute.patch("/blogPosts/:blogPostId/cover", postUpload, async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.blogPostId);

        if (post) { 

           const updatePost = await Post.findByIdAndUpdate(
            req.params.blogPostId, 
            //definisco il percorso del file caricato (URL img su Cloudinary):
            { cover: req.file.path }, 
            { new: true }
            )
            res.send(updatePost); 
        } else {
            let err = new Error("post not found!");
            err.status = 404;
            throw err;
        }        
    } catch (error) {
        next(error);
    }
})

//upload coverimage
postRoute.post("/blogPosts/coverimage", postUpload, async (req, res, next) => {
    try {
        const coverUrl = req.file.path;
        if (coverUrl) {
            res.status(200).json({ coverUrl });
        } else {
            res.status(500).send("C'è stato un errore nell'upload dell'avatar dell'autore!");
        }
    } catch (error) {
        next(error);
    }
})