import { useState } from 'react';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import { SlPencil } from "react-icons/sl";


export default function ModifyComment({commentToModify, onModify}) {

  //stato e gestione modale:
  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //recupero ID dell'autore dal local Storage:
  const authorId = localStorage.getItem("authorId");

  //destrutturo il commento da modificare: 
  const {author, content, _id} = commentToModify;

  //stato gestione modifiche:
  const [modifyContent, setModifyContent ] = useState(content);

  //funzione raccolta dati:
  const handleModifyComment = (e) => {
    e.preventDefault();

    //controllo immissione campo: 
    if(!modifyContent) {
      alert("Il campo deve essere compilato!")
    } else {
      const putComment = {
        _id: _id,
        content: modifyContent,
        author: authorId
      };
      onModify(putComment);
      handleClose();
    }
  }
    
  return (
  <>
    <Button className='rounded-0' variant="primary" onClick={handleShow}>
          <SlPencil />
    </Button>

    <Modal id="modify-article-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>

      <Modal.Header closeButton>
        <Modal.Title>Modifica il commento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='px-2'>
          <Form className="my-3">
              <FloatingLabel
                  controlId="floatingInput"
                  label="Il tuo commento..."
                  className="mb-3">
                  <Form.Control as="textarea" value={modifyContent}
                  onChange={(e) => setModifyContent(e.target.value)}/>
              </FloatingLabel>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className='btn-crud rounded-0' variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button className='btn-crud rounded-0' variant="success" onClick={handleModifyComment}>
          Salva le modifiche
          </Button>
      </Modal.Footer>
      
    </Modal>
  </>
)
}