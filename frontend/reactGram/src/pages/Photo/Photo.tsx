//Components
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";


//hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";

//redux
import { comments, getPhotoById, likePhoto } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";
import CommentItem from "../../components/CommentItem";

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
    setDeleteCommentModal(false);
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
        <CommentItem
        commentText={commentText}
        handleComment={handleComment}
        photo={photo}
        setCommentText={setCommentText}/>
      </div>
    </div>
  )
}

export default Photo;