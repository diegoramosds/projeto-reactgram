import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { uploads } from "../../utils/config"
import { Link } from "react-router-dom"

import { BsFillEyeFill } from "react-icons/bs"
import { useEffect } from "react"
import { getUserDetails } from "../../slices/userSlice"

export const Likes = () => {

  const dispatch: AppDispatch = useDispatch();

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {user} = useSelector((state: RootState) => state.user)

      //load user data
    useEffect(() => {
        if(userAuth?._id){
        dispatch(getUserDetails(userAuth?._id))
        }
    },[dispatch, userAuth])

return (
    <div>
        {user && user._id === userAuth?._id  &&(
        <div>
            {user.likedPhotos.map((liked) => (
                <div key={liked.photoId} className="border-b border-zinc-900 m-5 p-3 flex justify-around items-center">
                <img
                        src={`${uploads}/photos/${liked.photoImage}`}
                        alt=""
                        className="h-20 w-24 rounded-full"
                    />
                    <div>
                        <Link to={`/photos/${liked.photoId}`}> <p><BsFillEyeFill/></p></Link>
                    </div>
                </div>
            ))}
        </div>
        )}
    </div>
)
}
