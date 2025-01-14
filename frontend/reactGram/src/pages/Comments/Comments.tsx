import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../../store';
import { useEffect } from "react";
import { getAllComments, removeComment } from '../../slices/photoSlice';
import { uploads } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";

const Comments = () => {
    const {id} = useParams();

    const dispatch: AppDispatch = useDispatch();

    const resetMessage = useResetComponetMessage(dispatch);
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photo} = useSelector((state: RootState) => state.photo)

    useEffect(() => {
      if (userAuth?._id) {
        dispatch(getAllComments(userAuth._id))
      }
    }, [dispatch, userAuth]);

    const handleRemoveComment = (photoId: string, commentId: string) => {
        if (window.confirm("Tem certeza que deseja remover este comentário?")) {
        const commentData = {
        photoId,
        commentId
        }
      dispatch(removeComment(commentData))
      resetMessage();
      }}
      return (
        <div>
          {Array.isArray(photo.comments)  && photo.comments.length > 0 ? (
            photo.comments.map((comment) => (
              <div
                key={comment._id}
                className=""
              >
                {id === userAuth?._id ? (
                  <div className="m-5 flex items-center justify-around border-b rounded border-zinc-900">
                  <p>Comentário: {comment.comment}</p>
                <Link to={`/photos/${comment.photoId}`}>
                  <img
                    src={`${uploads}/photos/${comment.photoImage}`}
                    alt=""
                    className="h-20 w-24 rounded-full"
                  />
                </Link>
                <p
                    onClick={() => {
                      if (photo._id && comment._id) {
                        handleRemoveComment(photo._id, comment._id);
                      }
                    }}
                  >
                    <MdClose className="cursor-pointer"/>
                  </p>
                  </div>
                ) : (
                  <p className="text-center mt-10">Você não tem autorização para vizualizar comentários de outros usúarios nessa aba.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center mt-10">Você ainda não comentou nenhuma publicação</p>
          )}
        </div>
      );
}
export default Comments