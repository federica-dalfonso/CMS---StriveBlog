import "./ProfilePage.css";
import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";
import MySpinner from "../components/loaders/MySpinner";
import DeleteAuthor from "../components/backoffice/DeleteAuthor";
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage () {

    //token:
    const { token } = useContext(AuthContext);

    //salvo dati:
    const [ dataAuthor, setDataAuthor ] = useState(null);

    //loader:
    const [isLoading, setIsLoading] = useState(false);

    //navigate: 
    const navigate = useNavigate();


    const getAuthorData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response.ok) {
                const authorData = await response.json();
                setDataAuthor(authorData);                
                setIsLoading(false);
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    }
    
    useEffect(() => {
        getAuthorData();
    }, []);

    //DELETE: 
    const deleteAuthor = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/authors/${dataAuthor._id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": token,
                },
            });
            if(response.ok) {
                alert("Eliminazione effettuata con successo!");
                navigate("/");
            } else {
                console.error("C'è un errore nella tua richiesta!")
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error)
        }
    };


    return (
        <>
        <MyNav/>
            <Container className="d-flex flex-column my-5 style-box">
            {(isLoading || !dataAuthor) ? (
            <MySpinner/>
            ) : (
            <Row className="g-3">
                <Col xs={12} className="d-flex align-items-center justify-content-center gap-3">
                    <div>
                        <img src={dataAuthor.avatar} alt="immagine profilo autore" className="img-fluid profile-sec-img" />
                    </div>
                   <div>
                        <h4>{dataAuthor.name} {dataAuthor.surname}</h4>      
                        <p>{dataAuthor.email}</p> 
                        {dataAuthor.birth ? (
                        <p>{dataAuthor.birth}</p>
                        ) : ("")}                     
                    </div>
                </Col>                
                <>
                <Col xs={12} className="d-flex justify-content-center justify-content-md-end gap-2">
                <DeleteAuthor deleteFunction={deleteAuthor}/>
                </Col>
                </>
                
            </Row>
            )}
        </Container>        
        <MyFooter/>
        </>
    )
}