import { BsEye, BsHeart, BsHeartFill } from "react-icons/bs";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

interface Photo {
  _id: string;
  url: string;
  title: string;
  image: string | File;
  likes?: string[];
}

interface User {
  _id: string;
}

interface LikeContainer {
  photo: Partial<Photo>;
  user: User | null;
  handleLike: (photo: Partial<Photo>) => void;
}

const LikeContainer = ({ photo, user, handleLike }: LikeContainer) => {
  const likesCount = photo.likes?.length || 0;
  const userLiked = photo.likes?.includes(user?._id || "") ?? false;

  return (
    <div className="p-4">
      <div className="photo-likes flex gap-5 items-center">
        {photo.likes && user ? (
          userLiked ? (
            <BsHeartFill
              className="cursor-pointer text-red-800 w-9 h-9"
              size={36}
              onClick={() => handleLike(photo)}
              aria-label="Descurtir"
            />
          ) : (
            <BsHeart
              className="cursor-pointer hover:fill-red-900 w-9 h-9"
              size={36}
              onClick={() => handleLike(photo)}
              aria-label="Curtir"
            />
          )
        ) : (
          <BsHeart className="w-9 h-9 opacity-30" size={36} />
        )}

        {photo._id ? (
          <>
            <Link
              to={`/photos/${photo._id}`}
              aria-label={`Comentários na foto ${photo.title}`}
            >
              <LuMessageCircle className="w-9 h-9" size={36} />
            </Link>
            <Link
              to={`/photos/${photo._id}`}
              aria-label={`Ver foto ${photo.title}`}
            >
              <BsEye className="w-9 h-9" size={36} />
            </Link>
          </>
        ) : (
          <>
            <LuMessageCircle className="w-9 h-9 opacity-30" size={36} />
            <BsEye className="w-9 h-9 opacity-30" size={36} />
          </>
        )}
      </div>

      <p className="text-base mt-5 h-[1.5rem]">
        {photo.likes ? (
          <>
            {likesCount} curtida{likesCount !== 1 ? "s" : ""}
          </>
        ) : (
          "0 curtidas"
        )}
      </p>
    </div>
  );
};

export default LikeContainer;
