import { Schema, model } from "mongoose";

const authorSchema = new Schema(
    {
        name : {
            type: String,
            required: true
        }, 
        surname : {
            type: String, 
            required: true
        }, 
        email : {
            type: String, 
            required: true,
            unique: true, 
        }, 
        password: {
            type: String,
            required: false,
            select: false,
        },
        googleId: {
            type: String,
            required: false
        },
        birth : {
            type: String, 
            required: false
        }, 
        avatar : {
            type: String, 
            required: false
        },
        posts : [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        comments : [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
        
    {
        collection: "authors"
    }
)

export default model("Author", authorSchema);