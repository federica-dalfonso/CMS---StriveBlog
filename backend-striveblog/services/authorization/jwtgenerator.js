import jwt from "jsonwebtoken";
import { config } from "dotenv";

//generazione JWT
export const JWTgenerate = (payload) => {

    return new Promise((res, rej) => jwt.sign(
        //passo il payload, la secretJWT e la scadenza:
        payload,
        process.env.JWT_SEC,
        { expiresIn: "10h" },

        //gestione res e rej:
        (error, token) => {
            if (error) {
                rej(error)
            } else {
                res(token)
            }
        }
    ))
};