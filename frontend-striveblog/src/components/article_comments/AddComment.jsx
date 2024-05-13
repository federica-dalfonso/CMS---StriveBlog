import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useState } from "react";

export default function AddComment ( {commentsToAdd, onAddComment} ) {

    //stato nuovo commento:
    const [newComment, setNewComment] = useState("");

    //recupero l'id dell'autore nel local storage: 
    const userId = localStorage.getItem("authorId");

    //funzione per pulire il campo input dopo l'immissione del commento:
    const clearInput = () => {
        setNewComment("")
    };

    const handleNewComment = (e) => {
        e.preventDefault();

        //controllo campo commento: 
        if(!newComment) {
            alert("Non è possibile inviare un commento vuoto")
        } else {
            const commentData = {
                content: newComment,
                author: userId
            };
            onAddComment(commentData);
            clearInput();
        }
    }
    
    return (
        <div>
        <h4 className="text-uppercase fs-5">aggiungi un commento</h4>
            <Form>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Il tuo commento..."
                    className="mb-3">
                    <Form.Control as="textarea" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                </FloatingLabel>
                <Form.Group className="d-flex mt-3 justify-content-end gap-3">
                <Button
                    type="submit"
                    variant="dark"
                    className='rounded-0'
                    onClick={handleNewComment}
                >
                    Commenta 
                </Button>
                </Form.Group>
            </Form>            
        </div>
    )
}