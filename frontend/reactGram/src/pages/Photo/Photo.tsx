import { uploads } from "../../utils/config"

//Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

//hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";

//redux 
import { comments, getPhotoById, likePhoto, removeComment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";


const Photo = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);

  const {user} = useSelector((state: RootState) => state.auth);
  const {photo, error, loading, message} = useSelector((state: RootState) => state.photo);

  //comments
  const [commentText, setCommentText] = useState("")


  //load photo data
  useEffect(() => {
   dispatch(getPhotoById(id))

  },[dispatch, id])

  //Insert like
  const handleLike = () => {
    dispatch(likePhoto(photo._id!))

    resetMessage();
  };

  //Insert comment
  const handleComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id
    }
     dispatch(comments(commentData))

     setCommentText("");

     resetMessage();
  }

  //Remove comment
  const handleRemoveComment = (photoId: string, commentId: string) => {
    if (window.confirm("Tem certeza que deseja remover este comentário?")) {
    const commentData = {
     photoId,
     commentId
    }
   dispatch(removeComment(commentData))

   resetMessage();
  }
  }


  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="w-2/4 mt-0 mx-auto">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
      <div>
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
      <div>
        {photo.comments && (
          <>
          <h3>comentários({photo.comments?.length})</h3>
            <form onSubmit={handleComment}>
              <input type="text"
              placeholder="Insira seu comentário..."
              onChange={((e) => setCommentText(e.target.value))}
              value={commentText || ""}
               />
              <input type="submit" value="Enviar" />
             </form>
               {photo.comments?.length === 0 && <p>Não há comentarios...</p>}
               {photo.comments.map((comment) => (
                <div key={comment.comment} className="border rounded-lg m-2">
                  <div >
                    {comment.userImage && (
                     <img src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName} />
                    )}
                    <Link to={`/users/${comment.userId}`}>
                        {comment.userName}:
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <div className="">
                      {comment.comment}
                    </div>
                     <div className="cursor-pointer">
                      <p onClick={() => handleRemoveComment(photo._id, comment._id)}>X</p>
                      </div>
                  </div>
                  </div>
               ))}
          </>
        )}
      </div>
       
    </div>
  )
}

export default Photo;