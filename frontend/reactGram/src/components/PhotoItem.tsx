import { Link } from "react-router-dom";
import { uploads } from "../utils/config";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BiUserCircle } from "react-icons/bi";

interface Photo {
  _id: string;
  title: string;
  image: string | File;
  userId: {
    _id: string;
    name: string;
    profileImage: string;
  };
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

  const getImageSrc = (image: string | undefined) => {
    if (!image) return "";
    const baseUrl = image.startsWith("http")
      ? image
      : `${uploads}/photos/${image}`;
    return baseUrl.replace("/upload/", "/upload/w_720,f_auto,q_auto/");
  };

  const getProfileImageSrc = (image: string | undefined) => {
    if (!image) return "";
    const baseUrl = image.startsWith("http")
      ? image
      : `${uploads}/users/${image}`;
    return baseUrl.replace("/upload/", "/upload/w_100,f_auto,q_auto/");
  };

  const isCurrentUser = photo.userId?._id === user?._id;
  const profileImage = isCurrentUser
    ? user?.profileImage
    : photo.userId?.profileImage;

  return (
    <div className="w-full flex flex-col">
      <div className="m-2 flex items-center gap-2">
        <div>
          <Link to={`/users/profile/${photo.userId?._id}`}>
            {profileImage ? (
              <img
                src={getProfileImageSrc(profileImage)}
                alt={photo.userId?.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <BiUserCircle size={30} className="m-1" />
            )}
          </Link>
        </div>
        <div>
          <p>
            <Link
              to={`/users/profile/${photo.userId?._id}`}
              className="text-lg font-extrabold text-zinc-200"
            >
              {photo.userId?.name}
            </Link>
          </p>
          <p className="font-semibold text-zinc-400 text-sm">
            {formatDate(photo.createdAt)}
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <p className="font-semibold text-zinc-200 text-base w-11/12 m-4 ml-7 break-words">
          {photo.title}
        </p>
      </div>

      <div className="relative w-full bg-zinc-900 overflow-hidden">
        <img
          src={getImageSrc(photo.image as string)}
          alt={photo.title}
          className="w-full max-h-[500px] object-cover"
          width="1280"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          srcSet={`
      ${getImageSrc(photo.image as string)} 720w,
      ${getImageSrc(photo.image as string).replace("/w_720", "/w_1080")} 1080w,
      ${getImageSrc(photo.image as string).replace("/w_720", "/w_1440")} 1440w
    `}
        />
      </div>
    </div>
  );
};

export default PhotoItem;
