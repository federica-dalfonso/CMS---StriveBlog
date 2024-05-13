import Jumbotron from "./Jumbotron";
import { Container, Navbar } from "react-bootstrap";
import MenuOff from "./MenuOff";
import { useLocation } from "react-router-dom";


export default function MyNav() {

    //salvo percorso per renderizzazione di elementi in navbar:
    const location = useLocation();

    return (
        <>
        {location.pathname !== "/backoffice" &&
        <Jumbotron/>}
        <Navbar>
            <Container className="d-flex justify-content-end gap-3">
                <MenuOff/>                
            </Container>            
        </Navbar>
        </>
    )
}