
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store";

import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { Link, useParams } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { comments, getAllPhotos, likePhoto, removeComment } from "../../slices/photoSlice";
import { useEffect, useState } from "react";
import CommentItem from "../../components/CommentItem";

const Home = () => {

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);

  const {user} = useSelector((state : RootState) => state.auth);
  const {loading, photos, photo} = useSelector((state: RootState) => state.photo);

  const [commentText, setCommentText] = useState("")

   //load photo data
   useEffect(() => {
    dispatch(getAllPhotos())

   },[dispatch])

  //Insert like
  const handleLike = (photo) => {
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
    }}

  if(loading) {
    <p>Carregando</p>
  }

  return (
    <div>
      <h1 className="text-center m-8 text-2xl">Veja aqui as publicações</h1>
       {photos && photos.map((photo) => (
        <div key={photo._id} className="w-2/4 mx-auto pb-10 mb-40 border-b border-t border-zinc-800 shadow-md rounded-lg p-5">
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <CommentItem 
        commentText={commentText} 
        handleComment={handleComment} 
        handleRemoveComment={handleRemoveComment}
        photo={photo}
        setCommentText={setCommentText}/>
        </div>
       ))}
       {photos && photos.length === 0 && (
        <p>Ainda não ha publicações <Link to={`/users/${user?._id}`}>Clique aqui</Link> e faça um puclicação</p>
       )}
    </div>
  )
}
export default Home;