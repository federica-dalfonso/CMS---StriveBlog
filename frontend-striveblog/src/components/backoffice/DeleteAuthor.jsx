import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlTrash } from "react-icons/sl";


export default function DeleteAuthor() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDelete = (e) => {
    
  }
 
  return (
    <>
      <Button className='rounded-0 d-flex align-items-center gap-2' variant="danger" onClick={handleShow}>
            Elimina <SlTrash />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

          
        <Modal.Header closeButton>
            <Modal.Title>Attenzione</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span>Stai per eliminare definitivamente il tuo profilo. Vuoi procedere?</span>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" className='btn-crud rounded-0' onClick={handleClose}>
                Annulla
            </Button>
            <Button variant="success" className='btn-crud rounded-0'>Confermo</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}