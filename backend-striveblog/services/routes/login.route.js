import { Router } from "express";
import bcrypt from "bcryptjs";
import Author from "../models/author.model.js";
import { validateNewAuthor, validateLogin } from "../middleware/validate.authors.js";
import { JWTgenerate } from "../authorization/jwtgenerator.js";
import { authorUpload } from "../middleware/multer.cloudinary.js";
import passport from "passport";
import { config } from "dotenv";

export const loginRoute = Router();

loginRoute.post("/signin", validateNewAuthor, async (req, res, next) => {
    try {
        let newAuthor = await Author.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 12)
        });
        res.send(newAuthor);
    } catch (error) {
        //se mail è già presente:
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).send({ message: "L'indirizzo email è già in uso." });
        } else {
            next(error);
        }
    }    
});

loginRoute.post("/login", validateLogin, async ({body}, res, next) => {
    try {
        //cerco l'utente per email:
        let findUser = await Author.findOne({
            email: body.email,
        }).select("+password");

        if(findUser) {
            const match = await bcrypt.compare(body.password, findUser.password);

            if(match) {
                //*JWTgenerate è async
                const token = await JWTgenerate({
                    surname: findUser.surname, 
                    email: findUser.email,
                });
                res.send({ user: findUser, token })
            } else {
                res.status(400).send("Wrong password! Try again!")
            }
        } else {
            res.status(400).send("Author does not exist!")
        }        
    } catch (error) {
        next(error)
    }
});

//upload avatar
loginRoute.post("/avatar", authorUpload, async (req, res, next) => {
    try {
        const avatarUrl = req.file.path;
        if (avatarUrl) {
            res.status(200).json({ avatarUrl });
        } else {
            res.status(500).send("C'è stato un errore nell'upload dell'avatar dell'autore!");
        }
    } catch (error) {
        next(error);
    }
})

loginRoute.get("/googleLogin", passport.authenticate("google", { scope: ["profile", "email"] }));

loginRoute.get("/callback", passport.authenticate("google", {session: false}), (req, res, next) => {
    try {
        res.redirect(`${process.env.FRONTEND_URL}welcome?accessToken=${req.user.accToken}`);
    } catch (error) {
        next(error);
    }
})