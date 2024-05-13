import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Form, Button, Modal } from 'react-bootstrap';
import { SlPencil } from "react-icons/sl";

export default function ModifyAuthor() {

  //stato e gestione modale:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //recupero ID dell'autore dal local Storage:
  const {authorId} = useContext(AuthContext);

  //stato gestione modifiche: 


  //funzione raccolta dati: 
  const handleModifyArticle = (e) => {
  e.preventDefault();

  //controllo compilazione dati: 
    
}
  
    return (
    <>
      <Button className='rounded-0 d-flex align-items-center gap-2' variant="primary" onClick={handleShow}>
            Modifica <SlPencil />
      </Button>

      <Modal id="modify-modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo articolo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='px-2'>
            <Form className="my-3">

            <Form.Group className="mb-3 w-100" controlId="formBasicName">
                    <Form.Label className="form-labels">Nome*</Form.Label>
                    <Form.Control type="text" placeholder="es. Marco" autoComplete="given-name"
                    />
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicSurname">
                    <Form.Label className="form-labels">Cognome*</Form.Label>
                    <Form.Control type="text" placeholder="es. Rossi" autoComplete="family-name"
                    />
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label className="form-labels">Indirizzo e-mail*</Form.Label>
                    <Form.Control type="text" placeholder="es. mioindirizzo@email.com" autoComplete="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBirthDate">
                    <Form.Label className="form-labels">Data di nascita*</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" autoComplete="bday"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAvatar">
                    <Form.Label className="form-labels">Carica la tua immagine profilo</Form.Label>
                    <Form.Control type="file" name="avatar"
                    />
                </Form.Group>

            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn-crud rounded-0' variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button className='btn-crud rounded-0' variant="success" >
            Salva le modifiche
            </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  )
}
