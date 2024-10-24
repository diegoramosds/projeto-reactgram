import { Link } from "react-router-dom"
import { uploads } from "../utils/config"

interface PhotoItemProps {
    photo: {
        image: string,
        title: string,
        userId: string,
        userName: string
    }
  }

const PhotoItem = ({photo}: PhotoItemProps) => {
  return (
    <div className="w-full mt-10 flex flex-col gap-6">
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="rounded"/>
        )}
        <p className="text-xl font-bold text-center">{photo.title}</p>
        <p className="m-2"> Publicado por: 
         <Link to={`/users/${photo.userId}`} className="font-bold hover:border-b"> {photo.userName} </Link>
        </p>     
    </div>
  )
}

export default PhotoItem