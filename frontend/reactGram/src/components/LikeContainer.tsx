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
<div className="flex flex-col justify-center items-center gap-3 mt-8 border-t border-b border-zinc-800 p-5 w-11/12 mx-auto">
  {photo.likes && user && (
          <>
            {photo.likes.includes(user._id) ? (
              <BsHeartFill className="cursor-pointer text-red-800 hover:text-red-900"  onClick={() => handleLike(photo)}/>
            ) : (
              <BsHeart onClick={() => handleLike(photo)} className="cursor-pointer hover:text-red-900"/>
            )}
            <p>{photo.likes.length} like(s)</p>
          </>
        )}
      </div>
    );
  };
export default LikeContainer;