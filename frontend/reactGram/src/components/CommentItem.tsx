import { Link } from "react-router-dom"
import { uploads } from "../utils/config";

import { MdClose } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal";
import { removeComment } from "../slices/photoSlice";
import { useResetComponetMessage } from "../hooks/useResetComponentMessage";

interface CommentProps {
  _id: string;
  userId: string;
  userName: string;
  userImage: string;
  comment: string,
}

interface PhotoProps {
  _id: string ;
  comments: Partial<CommentProps>[];
}
interface CommentItemProps  {
photo: Partial<PhotoProps>,
handleComment:  (e: React.ChangeEvent<HTMLFormElement>) => void,
commentText: string,
setCommentText: React.Dispatch<React.SetStateAction<string>>,
}

const CommentItem = ({photo, handleComment, commentText, setCommentText}: CommentItemProps) => {

const { user } = useSelector((state : RootState) => state.auth);

  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
      useEffect(() => {
        if(deleteCommentModal) {
          document.body.classList.add("overflow-hidden")
        } else {
          document.body.classList.remove("overflow-auto")
        }
        return () => document.body.classList.remove("overflow-hidden");
      })

      const handleOpenModalDeleteComment = () => {
        setDeleteCommentModal(true)
      }

      const handleCloseModalDeleteComment = () => {
        setDeleteCommentModal(false)
      }

    const dispatch: AppDispatch = useDispatch();

    const resetMessage = useResetComponetMessage(dispatch);


      const handleRemoveComment = (photoId: string, commentId: string) => {
        const commentData = {
        photoId,
        commentId
        }
      dispatch(removeComment(commentData))
      resetMessage();
      setDeleteCommentModal(false);
      }
    return (
        <div>
          {Array.isArray(photo.comments) && (
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
                  {photo.comments.map((comment, i) => (
                    <div key={i} className=" bg-zinc-800 text-zinc-400  border-zinc-800 rounded-lg m-2 px-2 flex items-center justify-between">
                      <div>
                        {comment.userImage && (
                        <img src={`${uploads}/users/${comment.userImage}`}
                          alt={comment.userName} />
                        )}
                        <Link to={`/users/${comment.userId}`}>
                            {comment.userName}:
                        </Link>
                        <div className="">
                          {comment.comment}
                        </div>
                      </div>
                      <div className="cursor-pointer">
                        {comment.userId === user?._id && (
                          <p onClick={handleOpenModalDeleteComment}><MdClose /></p>
                        )}
                        </div>
                        {deleteCommentModal && (
                          <DeleteCommentModal
                          comment={comment}
                          handleCloseModalDeleteComment={handleCloseModalDeleteComment}
                          handleRemoveComment={handleRemoveComment}/>
                        )}
                      </div>
                  ))}
              </>
            )}
        </div>
      )
  }
export default CommentItem
