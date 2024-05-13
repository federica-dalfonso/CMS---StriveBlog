import { SlTrash } from "react-icons/sl";
import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function DeleteComment({commentToDelete, onDelete }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {_id} = commentToDelete;
  
    const handleDelete = (e) => {
      onDelete(_id);
    }
   
    return (
      <>
        <Button className='rounded-0 ms-2' variant="danger" onClick={handleShow}>
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
            <span>Stai per eliminare definitivamente il commento. Vuoi procedere?</span>
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
