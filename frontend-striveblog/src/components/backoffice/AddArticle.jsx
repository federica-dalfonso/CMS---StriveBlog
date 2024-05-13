import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Collapse, Form, Button } from 'react-bootstrap';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


export default function AddArticle ({onNewPost}) {
    //stato per collapse:
    const [open, setOpen] = useState(false);

    //stato dati nuovo post:
    const [postCategory, setPostCategory] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postCover, setPostCover] = useState("");
    const [postTime, setPostTime] = useState({
        value: 1,
        unit: ""
    });
    const [postContent, setPostContent] = useState(``);

    //recupero ID dell'autore dal local Storage:
    const {authorId} = useContext(AuthContext);

    const handleQuillChange = (value) => {
        setPostContent(value)
    };

    // funzione di raccolta del commento:
    const handleNewPost = (e) => {
        e.preventDefault();      

        //controllo compilazione esatta dei campi: 
        if(!postCategory || !postTitle || !postCover || !postTime || !postContent) {
            alert("Tutti i campi devono essere compilati!")
        } else {
            const postData = {
                category: postCategory,
                title: postTitle,
                cover: postCover, 
                readTime: {
                    value: parseInt(postTime.value, 10),
                    unit: postTime.unit
                },
                content: postContent,
                author: authorId
            }
            onNewPost(postData);
            resetFields();           
        };        
    }

    //funzione reset campi: 
    const resetFields = () => {
        setPostCategory('');
        setPostTitle('');
        setPostCover('');
        setPostTime({ value: 1, unit: '' });
        setPostContent('');
    };

    return (
        <>
        <div className='my-4 mx-3'>
            <button className="btn-collapsed-add"
                onClick={() => setOpen(!open)}
                aria-controls="collapse-area"
                aria-expanded={open}
            > {!open ? ("Aggiungi Articolo") : ("Chiudi")}
            </button> 
        </div>

        <Collapse in={open} className='mx-3 mb-5 add-box-style'>
            <div id="collapse-area">
                <Form className="my-3" onSubmit={handleNewPost}>

                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as="select" value={postCategory} onChange={(e) => setPostCategory(e.target.value)}                      
                        >
                            <option>Seleziona una categoria</option>
                            <option value="news">News</option>
                            <option value="classics">Classics</option>
                            <option value="reviews">Reviews</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="blog-title" className="mt-3">
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control placeholder="Titolo" value={postTitle} onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="blog-img" className="mt-3">
                        <Form.Label>Immagine di copertina</Form.Label>
                        <Form.Control type="file" name="cover" onChange={(e) => setPostCover(e.target.files[0])}
                        />
                    </Form.Group>

                    <Form.Group controlId="blog-content" className="mt-3">
                        <Form.Label>Contenuto Articolo</Form.Label>
                        <ReactQuill theme="snow" value={postContent} 
                        onChange={handleQuillChange} required/>
                    </Form.Group>

                    <Form.Group controlId="blog-time" className="mt-3">
                        <Form.Label>Tempo di lettura</Form.Label>
                        <div className='d-flex gap-2 w-50'>
                            <Form.Control type="number" min="1" max="6" placeholder="Inserisci un numero"
                            value={postTime.value} onChange={(e) => setPostTime({...postTime, value: e.target.value})}
                            />
                            <Form.Control as="select" value={postTime.unit} onChange={(e) => setPostTime({...postTime, unit: e.target.value})}
                               >
                                <option>Seleziona</option>
                                <option value="minuti">minuti</option>
                            </Form.Control> 
                        </div>
                    </Form.Group>

                    <Form.Group className="d-flex mt-3 justify-content-end gap-3">
                        <Button type="reset" variant="light" className='rounded-0' onClick={resetFields} >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="success"
                            className='rounded-0'
                        >
                            Salva 
                        </Button>
                    </Form.Group>

                </Form>

            </div>
        </Collapse>
        </>
      );
}