import { uploads } from "../../utils/config"

//Components
import { Link, useParams } from "react-router-dom"

//Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


//Redux
import { followingUser, getUserDetails, resetMessage } from '../../slices/userSlice';
import { AppDispatch, RootState } from "../../store"
import { getUserPhotos, likePhoto } from "../../slices/photoSlice"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"
import Message from "../../components/Message";

const Profile = () => {

    const {id} = useParams()

    const dispatch: AppDispatch = useDispatch()

    const {user, message, error, followers} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo)

    const [followersModal, setFollowersModal] = useState(false)

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }
}, [dispatch, id, followers]);

interface PhotoProps {
  _id: string,
}

//Insert like
  const handleLike = (photo: Partial<PhotoProps>) => {
    dispatch(likePhoto(photo._id!))
  };

    // if(loading) {
    //     return <p>Carregando...</p>
    // }


    //Start following
    const handleFollowing = () => {
      
      dispatch(followingUser(id as string));

      setTimeout(() => {
        dispatch(resetMessage())
      }, 1000)
    }
    const handleOpenModal = () => {
      setFollowersModal(true)
    }
    const handleCloseModal = () => {
      setFollowersModal(false)
    }

    useEffect(() => {
      if (followersModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      return () => document.body.classList.remove("overflow-hidden");
    }, [followersModal, followers]);


    return (
    <div className="w-2/3 mx-auto mt-6">
        <div className="border-b border-zinc-700 pb-1">
          <div className="flex justify-between">
                  {user?.profileImage && (
                      <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-40 h-40 rounded-full p-4"/>
                  )}
              <div className="flex gap-10 m-10 info-profile">
                <p ><span>{photos.length}</span>Publicações</p>
                <p onClick={handleOpenModal}><span>{user?.followers.length}</span>Seguidores</p>
                <p><span>87</span>Seguindo</p>

              </div>
          </div>
          <div className="flex justify-between items-center  px-10 py-2">
            <div className="m">
              <h2>{user?.name}</h2>
              <p>{user?.bio}</p>
            </div>
            <div>

                {userAuth?._id !== id  ? (
                  user?.followers.some((follower) => follower.userId?.includes(userAuth?._id as string)) ?
                  <button onClick={handleFollowing}>Seguindo</button>
                    : <button onClick={handleFollowing}>Seguir +</button>
                ) : ""}
                {/* {message && ( <Message msg={message} type="success"/>)}
                {error && ( <Message msg={message} type="error"/>)} */}
            </div>
            {followersModal && (
              <div  className="fixed  bg-black/70 inset-0 z-10">
              <div className=" w-1/2 h-full mx-auto gap-10 mt-10 z-20 bg-zinc-950">
              <p onClick={handleCloseModal} className="flex justify-end p-5">X</p>
              {user?.followers &&  user?.followers.map((follower) => (
                  <div className="mt-10 border-b border-zinc-900 w-3/4 mx-auto p-2">
                    <Link to={`/users/profile/${follower.userId}`} className="flex items-center  gap-20" onClick={handleCloseModal}>
                      <img src={`${uploads}/users/${follower.userImage}`} alt={follower.userName} className="h-16 rounded-full" />
                      <p>{follower.userName}</p>
                    </Link>
                  </div>
            ))}
            {followers.length === 0 && <p className="text-center">Esse usuário ainda não possui seguidores</p>}
        </div>
        </div>
            )}

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