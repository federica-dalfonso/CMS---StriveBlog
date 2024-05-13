import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';


export default function PostCard ({post}) {

    const { content, cover, readTime, title, _id, comments } = post;

    return (
        <>
        <Col sm={12} md={4} lg={4} className="d-flex">
        <Card className="card-style h-100 w-100">
            <Card.Img className="img-card-style" src={cover}>
            </Card.Img>
            <Card.Body className="d-flex flex-column">
                <Card.Text>
                    <span className="size-9"> tempo di lettura: {`${readTime.value} ${readTime.unit}`}
                    </span>
                </Card.Text>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="overflow">
                    {parse(content)}
                </Card.Text>
                <Card.Text> 
                    {comments.length} commenti
                </Card.Text>
                <Link className="mt-auto" to={`/details/:${_id}`}>Leggi l'articolo completo</Link>
            </Card.Body>
        </Card>
        </Col>        
        </>
    )
}