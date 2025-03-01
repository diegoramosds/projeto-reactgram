import { BsHeart, BsHeartFill } from "react-icons/bs"


interface Photo {
  _id: string;
  url: string;
  title: string;
  image: string | File;
  likes?: string[];
}

interface User {
  _id: string
}

interface LikeContainer {
  photo: Partial<Photo>,
  user: User | null,
  handleLike: (photo : Partial<Photo>) => void
}

const LikeContainer = ({ photo, user, handleLike }: LikeContainer) => {
  return (
<div className="flex flex-col items-center mt-7 mb-10">
  {photo.likes && user && (
          <div>
            <div className="photo-likes">
              {photo.likes.includes(user._id) ? (
                <BsHeartFill className="cursor-pointer text-white/80 rounded-full" size={36}  onClick={() => handleLike(photo)}/>
              ) : (
                <BsHeart onClick={() => handleLike(photo)} className="cursor-pointer" size={36}/>
              )}
            </div>
            <p className="text-sm">{photo.likes.length} curtida(s)</p>
          </div>
        )}
      </div>
    );
  };
export default LikeContainer;