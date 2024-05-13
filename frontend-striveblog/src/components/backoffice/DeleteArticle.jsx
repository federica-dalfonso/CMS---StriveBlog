import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlTrash } from "react-icons/sl";


export default function DeleteArticle({post, deleteFunction}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {_id} = post;

  const handleDelete = (e) => {
    deleteFunction(_id);
  }
 
  return (
    <>
      <Button className='rounded-0' variant="danger" onClick={handleShow}>
            <SlTrash />
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
          <span>Stai per eliminare definitivamente questo contenuto. Vuoi procedere?</span>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" className='btn-crud rounded-0' onClick={handleClose}>
                Annulla
            </Button>
            <Button variant="success" className='btn-crud rounded-0' onClick={handleDelete}>Confermo</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}