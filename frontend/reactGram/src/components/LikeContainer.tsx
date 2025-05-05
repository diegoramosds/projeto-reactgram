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
      {photo.likes && user ? (
        <div>
          <div className="photo-likes flex gap-5">
            {userLiked ? (
              <BsHeartFill
                className="cursor-pointer text-red-800 rounded-full"
                size={36}
                onClick={() => handleLike(photo)}
                aria-label="Descurtir"
              />
            ) : (
              <BsHeart
                onClick={() => handleLike(photo)}
                className="cursor-pointer hover:fill-red-900"
                size={36}
                aria-label="Curtir"
              />
            )}
            <Link
              to={`/photos/${photo._id}`}
              aria-label={`Comentários na foto ${photo.title}`}
            >
              <LuMessageCircle size={36} />
            </Link>
            <Link
              to={`/photos/${photo._id}`}
              aria-label={`Ver foto ${photo.title}`}
            >
              <BsEye size={36} />
            </Link>
          </div>
          <p className="text-base mt-5 min-h-[1.5rem]">
            {likesCount} curtida{likesCount !== 1 ? "s" : ""}
          </p>
        </div>
      ) : (
        <p className="text-base mt-5 min-h-[1.5rem]">0 curtidas</p>
      )}
    </div>
  );
};

export default LikeContainer;
