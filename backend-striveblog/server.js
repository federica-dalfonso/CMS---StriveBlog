import express from "express";
import {config} from "dotenv";
import { authorRoute } from "./services/routes/author.routes.js";
import { postRoute } from "./services/routes/post.routes.js";
import { commentRoute } from "./services/routes/comment.routes.js";
import { loginRoute } from "./services/routes/login.route.js";
import mongoose from "mongoose";
import cors from "cors";
import { badRequestHandler, genericError, 
        notFoundHandler, 
        invalidFIleError,
        notAuthorizedError } from "./services/middleware/handleErrors.js";
import { authMiddle } from "./services/middleware/authentication.midd.js";
import passport from "passport";
import googleStrategy from "./services/authorization/passport.js";


config();

const PORT = process.env.PORT || 3001;

const app = express();

//CORS per tutte le routes: 
app.use(cors());

app.use(express.json());

//googleStrategy:
passport.use("google", googleStrategy);

//route login/signin
app.use("/authorsarea", loginRoute);
//api - autori: 
app.use("/api", authMiddle, authorRoute);
//api - blogPost:
app.use("/api", authMiddle, postRoute);
//api - blogPost/comments:
app.use("/api", authMiddle, commentRoute);

//errorHandlers
app.use(notFoundHandler);
app.use(notAuthorizedError);
app.use(badRequestHandler);
app.use(invalidFIleError);
app.use(genericError);

const initServer = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL); 
        app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`);
    });

    } catch (error) {

        console.error("Connection failed:", error)

    }
}; 

initServer();

