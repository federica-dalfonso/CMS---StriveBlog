import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Form, Button, Modal } from 'react-bootstrap';
import { SlPencil } from "react-icons/sl";


export default function ModifyArticle( {post, modifyFunction} ) {

  //stato e gestione modale:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //recupero ID dell'autore dal local Storage:
  const {authorId} = useContext(AuthContext);

  //destrutturazione post da modificare:
  const { category, title, cover, content, readTime, _id  } = post;

  //stato gestione modifiche: 
  const [modifyCategory, setModifyCategory] = useState(category);
  const [modifyTitle, setModifyTitle] = useState(title);
  const [modifyCover, setModifyCover] = useState("");
  const [modifyContent, setModifyContent ] = useState(content);
  const [modifyTime, setModifyTime] = useState(readTime);


  //funzione raccolta dati: 
  const handleModifyArticle = (e) => {
  e.preventDefault();

  //controllo compilazione dati: 
  if (!modifyCategory || !modifyTitle || !modifyCover || !modifyContent || !modifyTime ) {
    alert("Tutti i campi devono essere compilati!")
  } else {
    const putData = {
      _id: _id,
      category: modifyCategory,
      title: modifyTitle,
      cover: modifyCover, 
      readTime: {
          value: parseInt(modifyTime.value, 10),
          unit: modifyTime.unit
      },
      content: modifyContent,
      author: authorId
    }
    modifyFunction(putData);
  }   

  handleClose();    
}
  
    return (
    <>
      <Button className='rounded-0' variant="primary" onClick={handleShow}>
            <SlPencil />
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

              <Form.Group controlId="blog-category" className="mt-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control as="select" value={modifyCategory}
                  onChange={(e) => setModifyCategory(e.target.value)}>
                      <option>Seleziona una categoria</option>
                      <option value="News">News</option>
                      <option value="Classics">Classics</option>
                      <option value="Reviews">Reviews</option>
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId="blog-title" className="mt-3">
                  <Form.Label>Titolo</Form.Label>
                  <Form.Control type='text' value={modifyTitle} onChange={(e) => setModifyTitle(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="blog-img" className="mt-3">
                  <Form.Label>Immagine di copertina</Form.Label>
                  <div className='d-flex align-items-center gap-3'>
                    <Form.Control type="file" name="cover"
                     onChange={(e) => setModifyCover(e.target.files[0])}/>
                    {cover && 
                    <img className='preview-article-img-size' src={cover} alt="Anteprima immagine di copertina"/>}
                  </div>                  
              </Form.Group>

              <Form.Group controlId="blog-content" className="mt-3">
                  <Form.Label>Contenuto Articolo</Form.Label>
                  <Form.Control as="textarea" value={modifyContent} onChange={(e) => setModifyContent(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="blog-time" className="mt-3">
                  <Form.Label>Tempo di lettura</Form.Label>
                  <div className='d-flex gap-2 w-50'>
                      <Form.Control type="number" min="1" max="6" value={modifyTime.value} onChange={(e) => setModifyTime({
                        ...modifyTime, 
                        value: e.target.value
                      })}/>
                      <Form.Control as="select" value={modifyTime.unit} onChange={(e) => setModifyTime({
                        ...modifyTime, 
                        unit: e.target.value
                      })}>
                          <option>Seleziona</option>
                          <option value="minutes">minutes</option>
                      </Form.Control> 
                  </div>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn-crud rounded-0' variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button className='btn-crud rounded-0' variant="success" onClick={handleModifyArticle}>
            Salva le modifiche
            </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  )
}