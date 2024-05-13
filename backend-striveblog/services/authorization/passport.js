import GoogleStrategy from "passport-google-oauth20";
import { config } from "dotenv";
import Author from "../models/author.model.js";
import { JWTgenerate } from "./jwtgenerator.js";

//opzioni OAuth:
const options = {
    clientID: process.env.GOOGLE_CL_ID,
    clientSecret: process.env.GOOGLE_CL_SECRET,
    callbackURL: process.env.CALL_URL
}

//creo e salvo la google strategy: 
const googleStrategy = new GoogleStrategy(options, async (_, __, profile, passportNext) => {
    try {
        const { email, given_name, family_name, sub, picture } = profile._json;
        //cerco l'utente:
        const user = await Author.findOne({ email });

        if(user) {
            const accToken = await JWTgenerate({
                _id: user._id, 
            });
            passportNext(null, {accToken});
            
        } else {
            const newUser = new Author({
                name: given_name,
                surname: family_name,
                email: email, 
                googleId: sub,
                avatar: picture
            });
            await newUser.save();
            
            const accToken = await JWTgenerate({
                name: newUser.name, 
                email: newUser.email
            });

            passportNext(null, { accToken })
        }
        
    } catch (error) {
        passportNext(error);
    }

});

export default googleStrategy;