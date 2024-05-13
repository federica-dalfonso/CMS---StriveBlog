import { Row, Col } from "react-bootstrap";
import MySpinner from "../loaders/MySpinner";
import parse from 'html-react-parser';


export default function FullArticle ({articleToShow}) {

    const { category, cover, author, readTime, title, content } = articleToShow || {};
    const contentText = `${content}`
    

    return (
        <>
        {!articleToShow ? (<MySpinner/>) : (
        <Row className="my-5 bottom-brd g-3">
            <Col xs={12}>
                <div>
                    <span className="thin-border text-uppercase">{category}</span>
                </div>
            </Col>  
            <Col xs={12}>
                <div>
                    <img className="max-size-img" src={cover} alt="immagine di copertina dell'articolo" />
                </div>
            </Col>
            <Col xs={12}>
                <div className="d-flex flex-column gap-2">
                    <span>{author?.name} {author?.surname}</span>
                    <span className="size-9">tempo di lettura: {readTime?.value} {readTime?.unit}</span>
                </div>
            </Col>
            <Col xs={12}>
                <div>
                    <h1>{title}</h1>
                </div>
            </Col>
            <Col xs={12}>
                <div>
                {parse(contentText)}
                </div>
            </Col>
        </Row>)
        }
        </>
        
    )
}