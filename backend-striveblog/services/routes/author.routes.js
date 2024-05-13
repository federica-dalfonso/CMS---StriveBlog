import { Router } from "express";
import Author from "../models/author.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { validateModifyAuthor } from "../middleware/validate.authors.js";
import { authorUpload } from '../middleware/multer.cloudinary.js';

export const authorRoute = Router();

// get autore autenticato:
authorRoute.get("/me", async (req, res, next) => {
    try {
      let author = await Author.findById(req.user.id) 
      res.send(author)
    } catch (error) {
      next(error)
    }
  })

//get articolo del singolo autore:
authorRoute.get("/authors/:authorId/blogPosts", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.authorId);

        if(author) {
            let postOf = await Post.find({
                author: author._id,
            });
            res.send(postOf);
        } else {
            let err = new Error("author not found!");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        next(error);
    }
})

// lista autori:
authorRoute.get("/authors", async (req, res, next) => {
    try {
        let authors = await Author.find().sort({name: 1}); 
        res.status(200).send(authors);
    } catch (error) {
        next(error);
    }
});

// singolo autore: 
authorRoute.get("/authors/:id", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id);
        //se l'autore non esiste findById restituisce null, quindi:
        if (author) {
            res.status(200).send(author);
        } else {
            let err = new Error("author not found!");
            err.status = 404;
            throw err;
        }    

    } catch (error) {
        next(error);
    }
});

// modifica autore:
authorRoute.put("/authors/:id", validateModifyAuthor, async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id);
        
        //findByIdAndUpdate ritorna null se non trova l'autore, quindi:
        if (author) {
            author = await Author.findByIdAndUpdate(req.params.id, req.body, 
            {new: true,
        });
        res.status(200).send(author);
        
        } else {
            let err = new Error("author not found!");
            err.status = 404;
            throw err;
        }     

    } catch (error) {
        next(error);        
    }
});

// eliminazione autore:
authorRoute.delete("/authors/:id", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id);

        if(author) {
            //cancello sia i post che i commenti associati a questo autore:
            await Post.deleteMany({author : req.params.id});
            await Comment.deleteMany({author : req.params.id});
            //e poi l'autore stesso:
            await Author.findByIdAndDelete({_id: req.params.id});
            res.sendStatus(204);
        } else {
            let err = new Error("author not found!");
            err.status = 404;
            throw err;
        }        
    } catch (error) {
        next(error);
    }
});

// patch modifica avatar:
authorRoute.patch("/authors/:authorId/avatar", authorUpload, async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.authorId);

        if(author) {
            const updateAuthor = await Author.findByIdAndUpdate(
            req.params.authorId, 
            //percorso del file caricato (URL img su Cloudinary):
            { avatar: req.file.path}, 
            { new: true }
            )
        res.send(updateAuthor);
        } else {
            let err = new Error("author not found!");
            err.status = 404;
            throw err;
        }        
    } catch (error) {
        next(error);
    }
});