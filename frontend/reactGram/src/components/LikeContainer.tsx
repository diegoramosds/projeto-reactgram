import { BsHeart, BsHeartFill } from "react-icons/bs"


const LikeContainer = ({ photo, user, handleLike }) => {
  return (
<div className="flex flex-col justify-center items-center gap-3 mt-8 border-t border-b border-zinc-800 p-5">
        {photo.likes && user && (
            <>
             {photo.likes.includes(user._id) ? (
                <BsHeartFill className="cursor-pointer" size={20}/>
             ) : (
                <BsHeart onClick={() => handleLike(photo)} className="cursor-pointer" size={20}/>
             )}
             <p> {photo.likes.length}  like(S)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer