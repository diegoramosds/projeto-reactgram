import { Link } from "react-router-dom"
import { uploads } from "../utils/config"


const PhotoItem = ({photo}) => {
  return (
    <div>
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
        )}
        <p>{photo.title}</p>
        <p> Publicado por:
        <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
        </p>     
    </div>
  )
}

export default PhotoItem