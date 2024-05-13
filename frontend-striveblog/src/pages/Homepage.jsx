import "./Homepage.css";
import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";
import AllPostsCards from "../components/homepage/AllPostsCards";
import { Container, Row, Col } from "react-bootstrap";

export default function Homepage () {

    return (
        <>
        <MyNav/>   
        <Container className="mt-5">
            <Row>
                <Col sm={12} className="main-border">
                    <AllPostsCards/> 
                </Col>
            </Row>
        </Container>  
        <MyFooter/>  
        </>
    )
}