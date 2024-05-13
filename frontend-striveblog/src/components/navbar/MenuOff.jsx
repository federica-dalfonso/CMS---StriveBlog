import "./MenuOff.css";
import Button from 'react-bootstrap/Button';
import { Offcanvas, ListGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import MySpinner from "../loaders/MySpinner";


export default function MenuOff () {

    //salvo percorso per renderizzazione di elementi in navbar:
    const location = useLocation();

    //useNavigate per reindirizzamento dopo logout:
    const toLoginPageAgain = useNavigate();

    //offcanvas:
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //dati User: 
    const [user, setUser] = useState(null);
    const {token, setToken, setAuthorId, setAuthenticated } = useContext(AuthContext);

    //GET /me (dati user loggato):
    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/me", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            if(response.ok) {
                const userData = await response.json();
                setUser(userData);  
                const storedId = localStorage.setItem("authorId", userData._id); 
                if(storedId) {
                    setAuthorId(storedId);
                };
                
            } else {
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
        }
    }
    
    useEffect(() => {
        getUserData();
    }, []);
    
    //funzione di logout utente:
    const handleLogOut = (e) => {
        setToken("");
        setAuthorId("");
        localStorage.removeItem("token");
        localStorage.removeItem("authorId");
        toLoginPageAgain("/");
    }

  return (
    <>
    {user ? (
        <>
        <Button onClick={handleShow} className="burger-style">
            <CiMenuBurger />
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ciao {user.name}! </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column justify-content-between gap-2">

                <div className="justified bord-bott pb-3">
                    <span>In questo spazio puoi gestire tutti i tuoi contenuti, aggiornare le informazioni
                        del tuo profilo e conoscere gli altri autori di Strive Blog. 
                        Buona navigazione!
                    </span>
                </div>

                <div className="border-nav">
                    <ListGroup className="li-gr-menu">
                        {location.pathname !== "/homepage" &&
                        <ListGroup.Item className="li-gr-menu-item py-3">
                            <Link className="link-to" to="/homepage">Homepage</Link>
                        </ListGroup.Item>
                        }                        
                        {location.pathname !== "/authors" &&
                        <ListGroup.Item className="li-gr-menu-item py-3">
                            <Link className="link-to" to="/authors">I nostri Autori</Link>
                        </ListGroup.Item>
                        }                        
                        {location.pathname !== "/backoffice" &&
                        <ListGroup.Item className="li-gr-menu-item py-3"> 
                            <Link className="link-to" to="/backoffice">Gestisci Articoli</Link>
                        </ListGroup.Item>
                        }   
                        {location.pathname !== "/profile" &&
                         <ListGroup.Item className="li-gr-menu-item py-3">
                            <Link className="link-to" to="/profile">Il tuo Profilo</Link>
                        </ListGroup.Item>   
                        }                         
                    </ListGroup>                  
                </div>

                <div>
                    <button className="btn-collapsed-add" onClick={handleLogOut}>
                    Logout
                    </button>
                </div>        

            </Offcanvas.Body>

        </Offcanvas>  
        </>
    ) : (
    <div>
        <MySpinner/>
    </div>
    )}    
    </>
  );
}