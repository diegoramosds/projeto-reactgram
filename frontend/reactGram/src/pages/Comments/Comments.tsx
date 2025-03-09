import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../../store';
import { useEffect, useState } from "react";
import { getAllComments, removeComment } from '../../slices/photoSlice';
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { getUserDetails } from "../../slices/userSlice";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import { LuMessageSquare } from "react-icons/lu";

const Comments = () => {
    const dispatch: AppDispatch = useDispatch();

    const resetMessage = useResetComponetMessage(dispatch);
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photo} = useSelector((state: RootState) => state.photo)

    const [deleteCommentModal, setDeleteCommentModal] = useState(false);

    useEffect(() => {
      if (userAuth?._id) {
        dispatch(getAllComments(userAuth._id))
        dispatch(getUserDetails(userAuth?._id))
      }
    }, [dispatch, userAuth]);

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
          {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
            photo.comments.map((comment) => (
              <div
                key={comment._id}
                className=""
              >
                {userAuth?._id === comment.userId && (
                  <div className="m-5 flex items-center justify-around border-b rounded border-zinc-900">
                    <p>Comentário: {comment.comment}</p>
                      <Link to={`/photos/${comment.photoId}`}>
                        <img
                          src={`${uploads}/photos/${comment.photoImage}`}
                          alt=""
                          className="h-20 w-24 rounded-full"
                        />
                      </Link>
                    <p>
                      <MdClose onClick={handleOpenModalDeleteComment} className="cursor-pointer"/>
                    </p>
                </div>
                )}
                {deleteCommentModal && (
                  <DeleteCommentModal
                  comment={comment}
                  handleCloseModalDeleteComment={handleCloseModalDeleteComment}
                  handleRemoveComment={handleRemoveComment}/>
                )}
              </div>
            ))
          ) : (
            <p className="flex flex-col gap-2 items-center text-center text-zinc-400 text-base">
              <span>
              <LuMessageSquare size={50} />
              </span>
              Você ainda não comentou em nenhuma publicação
              </p>
          )}
        </div>
      );
}
export default Comments