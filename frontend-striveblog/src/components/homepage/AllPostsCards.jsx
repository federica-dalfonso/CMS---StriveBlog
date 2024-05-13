import PostCard from "./PostCard";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AllCards () {

    const [articles, setArticles] = useState([]);

    const { token } = useContext(AuthContext);

    const getArticles = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/blogPosts", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const blogPosts = await response.json();
                setArticles(blogPosts);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    }; 

    useEffect(() => {
        getArticles();
    },[]);


    return (
        <>
        <Row className="g-3 mt-2 mb-5">
            <Col sm={12}>
            <h4 className="text-uppercase">Tutti gli articoli</h4>
            </Col>
            {articles.length === 0 ? 
            (<span>Nessun articolo presente!</span>) : (
                articles.map((post, index) => {
                    return <PostCard key={index} post={post}/>
                })
            )}
        </Row>
        </>
    )
}