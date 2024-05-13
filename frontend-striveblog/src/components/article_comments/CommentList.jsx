import {ListGroup} from 'react-bootstrap';
import DeleteComment from "./DeleteComment.jsx";
import ModifyComment from "./ModifyComment.jsx";


export default function CommentList( {commentsToShow, onModify, onDelete} ) {
  
  const key = localStorage.getItem("token");
  const userLogged = localStorage.getItem("authorId");
  
  return (
    <div className='d-flex flex-column'>
      <h4 className="text-uppercase fs-5">commenti</h4>
      <ListGroup variant="flush">
        {commentsToShow.length === 0 ? (
          <span className='fw-light fs-6 my-3'>Nessun commento presente!</span>
          ) : (
          commentsToShow.map((comment, index) => (
            <ListGroup.Item key={index} className='d-flex justify-content-start align-items-center'>
              <div className='d-flex flex-column gap-2'>
                <div className='d-flex justify-content-start align-items-center gap-1'>
                  <img className="users-picture-comment" src={comment.author.avatar} alt="immagine del profilo dell'autore" />
                  <span>{comment.author.name}</span> 
                  <span>{comment.author.surname}</span>
                </div>
                <div className='comment-text'>
                  {comment.content}
                </div>
              </div>          
              <div className='ms-auto d-flex'>
                {comment.author._id === userLogged && 
                <>
                  <ModifyComment commentToModify={comment} onModify={onModify}/>  
                  <DeleteComment commentToDelete={comment} onDelete={onDelete}/>          
                </>
                }   
              </div>
            </ListGroup.Item>
          ))
        )}   
      </ListGroup>    
    </div>    
  )
}