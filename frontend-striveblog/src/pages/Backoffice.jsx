import "./Backoffice.css";
import ArticleList from "../components/backoffice/ArticleList";
import AddArticle from "../components/backoffice/AddArticle";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import MyNav from "../components/navbar/MyNav";

export default function Backoffice ({convertFileToUrl}) {

    //get articoli presenti:
    const [postlist, setPostlist] = useState([]);
    //stato aggiornamento lista: 
    const [ updated, setUpdated ] = useState(false);

    const {token} = useContext(AuthContext);

    const getArticles = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/blogPosts", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const blogPosts = await response.json();
                // console.log(blogPosts);
                setPostlist(blogPosts);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Si è verificato un errore:", error);
        }
    }; 

    useEffect(() => {
        getArticles();
    },[updated]);

    //POST nuovo articolo: 
    const newPostAdded = async (postData) => {
        try {
            //caricamento immagine in cloudinary:
            let postCover = await convertFileToUrl({file: postData.cover, field: "cover"},
            "http://localhost:3001/api/blogPosts/coverimage", token);
            postData.cover = postCover.coverUrl;

            //fetch POST:
            const response = await fetch("http://localhost:3001/api/blogPosts", {
                method: "POST", 
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });
            if (response.ok) {
                const newBlogPost = await response.json();
                alert("L'articolo è stato salvato correttamente!");
                setPostlist(prev => [...prev, newBlogPost]);
                setUpdated(prev => !prev);
            } else {
                alert("Non è stato possibile salvare il tuo articolo. Riprova.")
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }
            
        } catch (error) {
            console.error("Si è verificato un errore:", error);
        }
        
    }

    return (
        <>
        <Container fluid className="my-3">
            <MyNav/>
            <Row>
                <Col sm={12}>
                    <AddArticle onNewPost={newPostAdded}/>
                </Col>

                <Col sm={12}>
                    <ArticleList postlist={postlist} setPostlist={setPostlist} convertFileToUrl={convertFileToUrl}/>
                </Col>

            </Row>
        </Container>        
        </>
    )
  }
