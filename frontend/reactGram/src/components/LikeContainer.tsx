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
  return (
    <div className="m-4">
      {photo.likes && user && (
        <div>
          <div className="photo-likes flex gap-5">
            {photo.likes.includes(user._id) ? (
              <BsHeartFill
                className="cursor-pointer text-red-800 rounded-full"
                size={36}
                onClick={() => handleLike(photo)}
              />
            ) : (
              <BsHeart
                onClick={() => handleLike(photo)}
                className="cursor-pointer hover:fill-red-900"
                size={36}
              />
            )}
            <Link to={`/photos/${photo._id}`}>
              <LuMessageCircle size={36} />
            </Link>
            <Link to={`/photos/${photo._id}`}>
              <BsEye size={36} />
            </Link>
          </div>
          <p className="text-base mt-5">{photo.likes.length} curtida(s)</p>
        </div>
      )}
    </div>
  );
};
export default LikeContainer;
