import jwt from "jsonwebtoken";
import Author from "../models/author.model.js";
import { config } from "dotenv";

//verifica token che serve nel middleware:
export const JWTverify = (token) => {

    return new Promise((res, rej) =>

      //verifico il token tramite la secretJWT
      jwt.verify(token, process.env.JWT_SEC, 
      
        //gestione res e rej:
        (error, decoded) => {
            if (error) {
                rej(error)
            } else {
                res(decoded)
            }
        }
      )
    )
};

// middleware autenticazione:
export const authMiddle = async (req, res, next) => {
  try {

    if (!req.headers["authorization"]) {      
      res.status(401).send("Sorry, you have to login to access this page!")
    } else {
      //verifica del token:
      const decoded = await JWTverify(
        req.headers["authorization"].replace("Bearer ", "")
      );
      if (decoded.exp) {
        //se il token decodificato ha il campo exp cerco l'autore:
        delete decoded.iat
        delete decoded.exp

        const me = await Author.findOne({
          ...decoded,
        })

        if (me) {
          req.user = me
          next()
        } else {
          res.status(401).send("author not found!")
        }
      } else {
        res.status(401).send("Please login again!")
      }
    }
  } catch (error) {
    next(error)
  }
}