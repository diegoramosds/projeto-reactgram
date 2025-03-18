import { Link } from "react-router-dom"
import { uploads } from "../utils/config"
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BiUserCircle } from "react-icons/bi";

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

const PhotoItem = ({ photo }: PhotoItemProps) => {

  const user = JSON.parse(localStorage.getItem("user") as string);

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "Data inválida";
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) return "Data inválida";
    return formatDistanceToNow(parsedDate, { locale: ptBR, addSuffix: true });
  };

  
  return (
    <div className="w-full flex flex-col">
      <div className="m-2 flex items-center gap-2">
        <div>
          <Link to={`/users/profile/${photo.userId}`}>
            {photo.userId === user?._id && user.profileImage ? (
              <img
                src={`${uploads}/users/${user?.profileImage}`}
                alt={photo.userName} 
                className="w-16 h-16 mx-auto rounded-full p-4 object-cover"
              />
            ) : (
              photo.userImage ? (
                <img 
                  src={`${uploads}/users/${photo.userImage}`} 
                  alt={photo.userName} 
                  className="w-16 h-16 mx-auto rounded-full p-4 object-cover"
                />
              ) : (
                <BiUserCircle size={30} className="m-1" />
              )
            )}
          </Link>
        </div>
        <div>
          <p>
            <Link to={`/users/profile/${photo.userId}`} className="text-lg font-extrabold text-zinc-200 text-cent"> 
              {photo.userName}
            </Link>
          </p>
          <p className="font-semibold text-zinc-400 text-sm">
            {formatDate(photo.createdAt)}
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-900">
        <p className="font-semibold text-zinc-200 text-base w-11/12 m-4 ml-7 text-wrap">
          {photo.title}
        </p>
      </div>
      <div className="relative bg-black/20 overflow-hidden">
        {photo.image && (
          <img 
            src={`${uploads}/photos/${photo.image}`} 
            alt={photo.title} 
            className="w-full h-full object-cover transition-transform duration-500"
          />
        )}
      </div>
    </div>
  )
}

export default PhotoItem;
