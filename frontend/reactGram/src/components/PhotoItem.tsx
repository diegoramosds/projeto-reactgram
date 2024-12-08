import { Link } from "react-router-dom"
import { uploads } from "../utils/config"

interface Photo {
    title: string;
    image: string | File;
    userId: string;
    userName: string;
  }

  interface PhotoItemProps {
    photo: Partial<Photo>;
  }

  const PhotoItem = ({ photo }: PhotoItemProps)=> {

  return (
    <div className="w-full mt-10 flex flex-col gap-6">
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="w-11/12 mx-auto rounded"/>
        )}
        <p className="text-xl font-bold text-center">{photo.title}</p>
        <p className="m-2"> Publicado por: 
         <Link to={`/users/${photo.userId}`} className="font-bold hover:border-b"> {photo.userName} </Link>
        </p>     
    </div>
  )
}

export default PhotoItem