import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../store"

const Interaction = () => {

const {user: userAuth} = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex justify-center gap-20 mt-5">
     <Link to={`/photos/find/comments/${userAuth?._id}`}>Comentários</Link>
     <Link to={`/photos/find/likes/${userAuth?._id}`}>Curtidas</Link>
     </div>
  )
}

export default Interaction