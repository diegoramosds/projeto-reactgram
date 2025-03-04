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
import LikeContainer from "../../components/LikeContainer"
import ModalFollowers from "../../components/ModalFollowers";
import PhotoItem from "../../components/PhotoItem";
import { BiGrid } from "react-icons/bi";

const Profile = () => {

    const {id} = useParams()

    const dispatch: AppDispatch = useDispatch()

    const {user, followers} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo)
    const [followersModal, setFollowersModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);

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

    //Open followers modal
    const followersOpenModal = () => {
      setFollowersModal(true)
    }

    //Close followers modal
    const followersCloseModal = () => {
      setFollowersModal(false)
    }

    //Open following modal
    const followingOpenModal = () => {
      setFollowingModal(true)
    }

    //Close following modal
    const followingCloseModal = () => {
      setFollowingModal(false)
    }



    useEffect(() => {
      if (followersModal || followingModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      return () => document.body.classList.remove("overflow-hidden");
    }, [followersModal, followers, followingModal]);

    return (
    <div className="w-2/3 mx-auto mt-2">
          <div className="flex flex-col gap-3">
                  {user?.profileImage && (
                      <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-32 h-32 mx-auto rounded-full p-4 object-cover"/>
                  )}
              <div className="flex gap-3 flex-col items-center justify-center">
              <h2 className="text-2xl font-medium">{user?.name}</h2>
              <p className="text-base text-zinc-400">{user?.bio}</p>
              </div>
              {userAuth?._id === user?._id && (
                <div className="flex justify-center">
                <Link to='/settings'>
                  <p className="border p-1 px-4 rounded-full cursor-pointer bg-zinc-200 hover:bg-zinc-100 transition-colors duration-200 text-zinc-900 font-medium">
                    Editar perfil
                  </p>
                </Link>
              </div>
              )}
              <div className="flex items-center justify-center gap-10 mt-4 info-profile">
                  <p>
                    {photos?.length || 0} <span>Publicações</span> 
                  </p>
                  <p onClick={followersOpenModal}>
                    {user?.followers?.length || 0} <span>Seguidores</span>
                  </p>
                  <p onClick={followingOpenModal}>
                    {user?.following?.length || 0} <span>Seguindo</span> 
                  </p>
              </div>

          </div>
          <div className="flex justify-between items-center  px-10 py-2">
            <div>

                {user && userAuth?._id !== id  ? (
                  Array.isArray(user?.followers) && user?.followers.some((follower) => follower.userId?.includes(userAuth?._id as string)) ?
                  <button onClick={handleFollowing}>Seguindo</button>
                    : <button onClick={handleFollowing}>Seguir +</button>
                ) : ""}
                {/* {message && ( <Message msg={message} type="success"/>)}
                {error && ( <Message msg={message} type="error"/>)} */}
            </div>
            {followersModal && (
              <ModalFollowers
              closeModal={followersCloseModal}
              user={user}
              textInfo="Esse usuário ainda não possui seguidores"
              dataType="followers"
              />
            )}
                {followingModal && (
                        <ModalFollowers
                        closeModal={followingCloseModal}
                        user={user}
                        textInfo="Esse usuário ainda não segue ninguém"
                        dataType="following"
                        />
                            )}

          </div>
        <div className="m-4 pb-20">
            <div className="w-full flex flex-col flex-wrap">
                <div className="border-t border-b border-zinc-900 p-4">
                  <h2 className="flex items-center gap-1 justify-center text-lg w-1/6 mx-auto border-b-[3px] p-1"><BiGrid />Publicações</h2>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {photos && photos.map((photo) => (
                    <div key={photo._id} className="flex flex-col
                    bg-zinc-900/30 w-[60%] mx-auto mt-20 rounded-xl shadow-md border border-zinc-900 
                      justify-between mb-48">
                        <PhotoItem photo={photo}/>
                        <LikeContainer handleLike={handleLike} photo={photo} user={userAuth}/>
                        <Link to={`/photos/${photo._id}`}>
                                    <p className="text-center p-3 bg-zinc-900/70 text-sm hover:bg-zinc-900/74 hover:text-zinc-300 rounded-b-xl">Veja detalhes</p>
                        </Link>
                    </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há publicações</p>}
                </div>
            </div>
        </div>
    </div>
    )}

export default Profile