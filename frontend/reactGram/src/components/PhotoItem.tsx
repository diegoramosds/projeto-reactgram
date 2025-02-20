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
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="w-11/12 mx-auto rounded-3xl"/>
        )}
        <p className="text-xl font-bold text-center">{photo.title}</p>
        <p className="m-2 text-center"> Publicado por:

        <Link to={`/users/profile/${photo.userId}`} className=" font-bold text-sky-700 border-b border-sky-700 hover:text-sky-700/70 text-cent"> {photo.userName} </Link>
        </p>
    </div>
  )
}

export default PhotoItem