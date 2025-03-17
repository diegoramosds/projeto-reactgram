import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { uploads } from "../../utils/config"
import { Link } from "react-router-dom"

import { BsFillEyeFill } from "react-icons/bs"
import { useEffect } from "react"
import { getUserDetails, clenupLikes } from "../../slices/userSlice"
import { LuHeart } from "react-icons/lu"

export const Likes = () => {

    const dispatch: AppDispatch = useDispatch();

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {user} = useSelector((state: RootState) => state.user)

      //load user data
    useEffect(() => {
        if(userAuth?._id){
        dispatch(getUserDetails(userAuth?._id))
        dispatch(clenupLikes())
        }
    },[dispatch, userAuth])

return (
    <div>
        {user && user._id === userAuth?._id  && user.likedPhotos.length > 0 ? (
        <div>
            {user.likedPhotos.map((liked) => (
                <div key={liked.photoId} className="border-b w-full border-zinc-900 m-2 flex justify-between items-center gap-10">
                <img
                        src={`${uploads}/photos/${liked.photoImage}`}
                        alt=""
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full"
                    />
                    <div>
                        <Link to={`/photos/${liked.photoId}`}> <p><BsFillEyeFill/></p></Link>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <p className="flex flex-col gap-2 items-center text-center text-zinc-400 text-base">
                        <span>
                        <LuHeart size={50} />
                        </span>
                        Você ainda não curtiu nenhuma publicação
                        </p>
        )}
    </div>
)}