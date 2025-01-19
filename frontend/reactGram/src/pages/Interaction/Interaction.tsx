import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useState } from "react"
import { Likes } from "../Likes/Likes"
import Comments from "../Comments/Comments"

const Interaction = () => {

const {user: userAuth} = useSelector((state: RootState) => state.auth)

const navigate = useNavigate()


  const dispatch: AppDispatch = useDispatch();

  const [findComments, setFindComments] = useState(false);
  const [findLikes, setFindLikes] = useState(false);
  const [firstSearchCompleted, setFirstSearchCompleted] = useState(false);

  // useEffect(() => {
  //   if (search) {
  //     dispatch(searchPhoto(search));
  //     dispatch(searchComments(search));
  //     if (!firstSearchCompleted) {
  //       setFind(true);
  //       setFirstSearchCompleted(true);
  //     }
  //   } else {
  //     setFind(false);
  //     setFindComments(false);
  //     setFirstSearchCompleted(false);
  //   }
  // }, [firstSearchCompleted]);


  const handleComments = () => {
    setFindComments(true)
    setFindLikes(false)
  }

  const handleLikes = () => {
    setFindLikes(true)
    setFindComments(false)
  }
  return (
    <div className="flex justify-center gap-20 mt-5">
      <div className="flex gap-5 justify-center">
        <h2 onClick={handleComments} className={
                findComments ? "text-sky-700/80 border-b border-sky-700" : ""
              }>Comentarios</h2>

        <h2 onClick={handleLikes} className={
                findLikes ? "text-sky-700/80 border-b border-sky-700" : ""
              }>Curtidas</h2>
      </div>

      {findComments && (
        <Comments />
      )}

      {findLikes && (
        <Likes />
      )}
      </div>
  )
}

export default Interaction