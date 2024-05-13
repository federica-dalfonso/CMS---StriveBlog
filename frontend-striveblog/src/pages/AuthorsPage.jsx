import "./AuthorsPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";
import { Container, Row, Col, ListGroupItem } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

export default function AuthorsPage () {

    //stato lista autori:
    const [authors, setAuthors] = useState([]);

    //recupero token e IDAutore
    const {token, authorId} = useContext(AuthContext);

    const getAuthors = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/authors", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const authorsList = await response.json();
                setAuthors(authorsList);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    }; 

    useEffect(() => {
        getAuthors();
    },[]);

    return (
        <>
        <MyNav/>
        <Container className="my-5">
            <Row className="my-3">
                <Col xs={12}>
                    <ListGroup>
                        {authors.length === 0 ? (
                            <span className='fw-light fs-6 my-3'>Nessun autore presente in database!</span>
                        ) : (
                            authors.map((auth, index) => {
                            return <ListGroupItem key={index} className={`d-flex justify-content-between align-items-center border-0 rounded-0 bottom-style ${auth._id === authorId ? "authenticated-author" : ""}`}>
                                <div>
                                    <img className="users-picture" src={auth.avatar} alt="immagine del profilo dell'autore" />
                                </div>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">
                                        {auth.name} {auth.surname}
                                    </div>
                                    {auth.email}
                                </div>
                                {auth._id === authorId && 
                                <Badge bg="success" className="rounded-0 fw-lighter text-uppercase me-1">tu</Badge>  
                                }
                                <Badge bg="dark" className="rounded-0 fw-lighter text-uppercase">
                                articoli {auth.posts.length}
                                </Badge>                                        
                            </ListGroupItem>
                            })
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        <MyFooter/>        
        </>
    )
}