import { uploads } from "../../utils/config"

//Components
import { Link, useParams } from "react-router-dom"

//Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


//Redux
import { followingUser, getUserDetails } from '../../slices/userSlice';
import { AppDispatch, RootState } from "../../store"
import { getUserPhotos, likePhoto } from "../../slices/photoSlice"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"

const Profile = () => {

    const {id} = useParams()


    const [following, setFollowing] = useState(false)

    const dispatch: AppDispatch = useDispatch()

    const {user, loading} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo)

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }
}, [dispatch, id]);

interface PhotoProps {
  _id: string,
}

//Insert like
  const handleLike = (photo: Partial<PhotoProps>) => {
    dispatch(likePhoto(photo._id!))
  };

    if(loading) {
        return <p>Carregando...</p>
    }


    //Start following
    const handleFollowing = () => {
      dispatch(followingUser(id));

      setFollowing(true);
    }

    return (
    <div className="w-2/3 mx-auto mt-6">
        <div className="border-b border-zinc-700 pb-1">
          <div className="flex justify-between">
                  {user?.profileImage && (
                      <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-40 h-40 rounded-full p-4"/>
                  )}
              <div className="flex gap-10 m-10 info-profile">
                <p><span>{photos.length}</span>Publicações</p>
                <p><span>87</span>Seguidores</p>
                <p><span>87</span>Seguindo</p>
              </div>
          </div>
          <div className="flex justify-between items-center  px-10 py-2">
            <div className="m">
              <h2>{user?.name}</h2>
              <p>{user?.bio}</p>
            </div>
            <div>

                {following ? <button onClick={handleFollowing}>Seguindo</button> : <button onClick={handleFollowing}>Seguir +</button>}
            </div>
          </div>
        </div>
        <div className="m-4">
            <div className="w-full flex flex-col flex-wrap mt-5">
                <h2 className="font-bold text-xl mb-5">Fotos publicadas</h2>
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {photos && photos.map((photo) => (
                    <div key={photo._id} className="flex flex-col w-4/5">
                        <PhotoItem photo={photo}/>
                        <LikeContainer handleLike={handleLike} photo={photo} user={userAuth}/>
                    </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há publicações</p>}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Profile