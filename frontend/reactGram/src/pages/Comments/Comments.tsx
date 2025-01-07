import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../../store';
import { useEffect } from "react";
import { getAllComments, removeComment } from '../../slices/photoSlice';
import PhotoItem from "../../components/PhotoItem";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";




const Comments = () => {
    const dispatch: AppDispatch = useDispatch();

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photo} = useSelector((state: RootState) => state.photo)
    useEffect(() => {
      if (userAuth?._id) {
        dispatch(getAllComments(userAuth._id));
      }
    }, [dispatch, userAuth])

    const  handleRemoveComment = () => {
        dispatch(removeComment())
    }
  return (
    <div>
        {photo.comments && photo.comments.map((comment) => (
            <div key={comment._id} className="m-5 flex items-center justify-around border-b rounded border-zinc-900">
              <p>Comentario: {comment.comment}</p>
              <Link to={`/photos/${comment.photoId}`}>
              <img src={`${uploads}/photos/${comment.photoImage}`} alt="" className="h-20 w-24 rounded-full"/>
              </Link>
              <p onClick={handleRemoveComment}>X</p>
            </div>
        ))}
        {photo.comments?.length === 0 && <p className="text-center mt-10">Você ainda não comentou nenhuma publicação</p>}
    </div>
  )
}
export default Comments