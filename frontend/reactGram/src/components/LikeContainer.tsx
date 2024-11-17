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
<div className="flex flex-col justify-center items-center gap-3 mt-8 border-t border-b border-zinc-800 p-5">
  {photo.likes && user && (
          <>
            {photo.likes.includes(user._id) ? (
              <BsHeartFill className="cursor-pointer"  onClick={() => handleLike(photo)}/>
            ) : (
              <BsHeart onClick={() => handleLike(photo)} className="cursor-pointer"/>
            )}
            <p>{photo.likes.length} like(s)</p>
          </>
        )}
      </div>
    );
  };
export default LikeContainer;