import { ListGroup } from "react-bootstrap";
import ModifyArticle from "./ModifyArticle";
import DeleteArticle from "./DeleteArticle";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ArticleList ({postlist, setPostlist, convertFileToUrl}) {

    const { token, authorId } = useContext(AuthContext)

    const deleteArticle = async (_id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogPosts/${_id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": token,
                },
            });
            if(response.ok) {
                setPostlist(postlist.filter(post => post._id !== _id));
                alert("Eliminazione effettuata con successo!")
            } else {
                console.error("C'è un errore nella tua richiesta!")
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error)
        }
    };

    //funzione modifica
    const modifyArticle = async (putData) => {
        try {
            //caricamento immagine in cloudinary:
            let postCover = await convertFileToUrl({file: putData.cover, field: "cover"}, 
            "http://localhost:3001/api/blogPosts/coverimage", token);    
            //li salvo nelle variabili che ho definito sopra, accedendo al singolo url restituito dall'endpoint:
            putData.cover = postCover.coverUrl;

            //fetch PUT:
            const response = await fetch(`http://localhost:3001/api/blogPosts/${putData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": token,
                },
                body: JSON.stringify(putData)
            });
            if(response.ok) {
                const modifiedData = await response.json();
                alert("Modifiche effettuate con successo!")
            } else {
                alert("Non è stato possibile salvare le modifiche. Riprova.")
                console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error("Si è verificato un errore:", error)
        }
    }

    return (
        <>
        <ListGroup as="ol" numbered className="mx-3 rounded-0">
            {postlist ? (
                 postlist.map((post, index) => {

                    return (
                        <ListGroup.Item as="li" className="d-flex align-items-center" key={index}>
                            <span>{post.title}</span>
                            <div className="d-flex ms-auto gap-3 btn-crud">
                                {post.author === authorId && 
                                <>
                                <ModifyArticle post={post} modifyFunction={modifyArticle}/>
                                <DeleteArticle post={post} deleteFunction={deleteArticle}/>
                                </>
                                }                                
                            </div>
                        </ListGroup.Item>)
                        })
                    ) : (

                    <span>Nessun post è ancora stato inserito!</span>
            )}
        </ListGroup>
        </>
        
    )
}