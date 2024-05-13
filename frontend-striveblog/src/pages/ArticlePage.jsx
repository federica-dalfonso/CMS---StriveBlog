import "./ArticlePage.css";
import MyNav from "../components/navbar/MyNav";
import FullArticle from "../components/article_comments/FullArticle";
import MyFooter from "../components/footer/MyFooter";
import CommentList from "../components/article_comments/CommentList";
import AddComment from "../components/article_comments/AddComment";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function ArticlePage () {

    //stato per singolo post: 
    const [singleArticle, setSingleArticle] = useState({});
    //stato per commenti:  
    const [comments, setComments] = useState([]);

    //recupero l'id del post dall'url
    let { id } = useParams();
    id = id.slice(1);

    //token e id user loggato: 
    const key = localStorage.getItem("token");
    const userId = localStorage.getItem("authorId");

    //GET singolo articolo:
    const getArticle = async () => {
        // console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${id}`, {
                headers: {
                    "authorization": `Bearer ${key}`
                }
            });
            if (response.ok) {
                const blogPost = await response.json();
                // console.log(blogPost);
                setSingleArticle(blogPost);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    }; 

    //effettuo la fetch quando il componente viene montato:
    useEffect(() => {
        getArticle();
    },[]);

    //GET commenti all'articolo:
    const getComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${id}/comments`, {
                headers: {
                    "authorization": `Bearer ${key}`
                }
            });
            if (response.ok) {
                const commentList = await response.json();
                setComments(commentList);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    };

    //effettuo la fetch quando il componente viene montato e/o viene aggiunto un nuovo commento:
    useEffect(() => {
        getComments();
    },[comments]);    

    //POST nuovo commento: 
    const postComment = async (commentData) => {
        
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${id}`, {
                method: "POST", 
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${key}`
                },
                body: JSON.stringify(commentData)
            });
            if(response.ok) {
                const newComment = await response.json();
                alert("Il commento è stato salvato correttamente!");
                //aggiungo il commento all'array di commenti:
                setSingleArticle(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, newComment]
                }));
            } else {
                alert("Non è stato possibile salvare il commento. Riprova.")
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }            
        } catch (error) {
            console.error("Si è verificato un errore:", error);
        }
    }

    //PUT modifica commento: 
    const modifyComment = async (putComment) => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${id}/comment/${putComment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${key}`,
                },
                body: JSON.stringify(putComment)
            });
            if(response.ok) {
                const modifiedComment = await response.json();
                alert("Modifiche effettuate con successo!")
            } else {
                alert("Non è stato possibile salvare le modifiche. Riprova.")
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }            
        } catch (error) {
            console.error("Si è verificato un errore:", error)
        }
    }

    //DELETE commento:
    const deleteComment = async (_id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${id}/comment/${_id}`, {
                method: "DELETE",
                headers: { 
                    "authorization": `Bearer ${key}`,
                },
            });
            if(response.ok) {
                setComments(comments.filter(comm => comm._id !== _id));
                alert("Eliminazione effettuata con successo!")
            } else {
                console.error("C'è un errore nella tua richiesta!")
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error)
        }
    }

    return (
        <>
        <MyNav/>
        <Container>
            {singleArticle && <FullArticle articleToShow={singleArticle}/>}
            <Row className="my-5 g-3">
                <Col xs={12} md={6} lg={6}>
                    {comments && <CommentList commentsToShow={comments} onModify={modifyComment} onDelete={deleteComment}/>}                    
                </Col>
                <Col xs={12} md={6} lg={6}>
                    {comments && <AddComment commentsToAdd={comments} onAddComment={postComment}/> }
                </Col>
            </Row>           
        </Container>
        <MyFooter/>
        </>
    )
}