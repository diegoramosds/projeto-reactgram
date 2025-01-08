import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../../store';
import { useEffect } from "react";
import { getAllComments, removeComment, resetMessage } from '../../slices/photoSlice';
import PhotoItem from "../../components/PhotoItem";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";




const Comments = () => {
    const dispatch: AppDispatch = useDispatch();

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photo} = useSelector((state: RootState) => state.photo)
    useEffect(() => {
      if (userAuth?._id && photo.comments?.length >= 1) {
        dispatch(getAllComments(userAuth._id));
      }
    }, [dispatch, userAuth])


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
      
        {Array.isArray(photo.comments) && photo.comments && photo.comments.map((comment) => (
            <div key={comment._id} className="m-5 flex items-center justify-around border-b rounded border-zinc-900">
              <p>Comentario: {comment.comment}</p>
              <Link to={`/photos/${comment.photoId}`}>
              <img src={`${uploads}/photos/${comment.photoImage}`} alt="" className="h-20 w-24 rounded-full"/>
              </Link>
              {comment.userId === userAuth?._id && (
                                        <p onClick={() => {
                                          if (photo._id && comment._id) {
                                            handleRemoveComment(photo._id, comment._id);
                                          }
                                        }}><MdClose /></p>
                                      )}
            </div>
        ))}
        {photo.comments?.length === 0 && <p className="text-center mt-10">Você ainda não comentou nenhuma publicação</p>}
    </div>
  )
}
export default Comments