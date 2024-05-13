import { Container, Row, Col, Form } from "react-bootstrap";
import { SlEnvolope } from "react-icons/sl";
import { SlSocialPintarest, SlSocialInstagram, SlSocialFacebook } from "react-icons/sl";

export default function MyFooter () {
    return (
        <>
        <Container fluid className="top-border-custom">
            <Row>
                <Col xs={12} md={6} lg={6} className="d-flex justify-content-center justify-content-md-end gap-3 mt-4">
                    <SlSocialPintarest className="social-icon-style"/>
                    <SlSocialInstagram className="social-icon-style"/>
                    <SlSocialFacebook className="social-icon-style"/>
                </Col>
                <Col xs={12} md={6} lg={6} className="d-flex flex-column align-items-center align-items-md-start gap-2 mt-4">
                    <span>striveblog@cinema.com</span>
                    <span>088-800 0000</span>
                </Col>
                <Col xs={12} className="d-flex justify-content-center mt-4 mb-2">
                    <span className="fw-lighter">made 4 Epicode M6 - WDPT0523</span>
                </Col>
            </Row>
        </Container>
        </>
    )
}