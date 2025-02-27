import { Link } from "react-router-dom"
import { uploads } from "../utils/config"

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Photo {
    title: string;
    image: string | File;
    userId: string;
    userName: string;
    userImage: string;
    createdAt: Date;
  }

  interface PhotoItemProps {
    photo: Partial<Photo>;
  }


  const PhotoItem = ({ photo }: PhotoItemProps)=> {

    const formatDate = (dateString?: Date) => {
      if (!dateString) return "Data inválida"; // Se a data for null/undefined, exibe mensagem
  
      const parsedDate = new Date(dateString);
  
      if (isNaN(parsedDate.getTime())) return "Data inválida"; // Se a data for inválida, evita erro
  
      return formatDistanceToNow(parsedDate, { locale: ptBR, addSuffix: true });
  };

  return (
    <div className="w-full flex flex-col gap-6">
        <div className="m-4 flex items-center gap-4">
        {photo.image && (
          <Link to={`/users/profile/${photo.userId}`}>
            <img src={`${uploads}/users/${photo.userImage}`} alt={photo.title} className="w-10 rounded-full"/>
          </Link>
        )}

          <div className="">
            <p>
            <Link to={`/users/profile/${photo.userId}`} className="text-lg font-extrabold text-zinc-200 text-cent"> {photo.userName} </Link>
            </p>
            <p className="font-semibold text-zinc-400 text-sm">{formatDate(photo.createdAt)}</p>
          </div>
        </div>
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>
        )}
        <p className="font-semibold text-zinc-200 text-base text-center">{photo.title}</p>

    </div>
  )
}

export default PhotoItem