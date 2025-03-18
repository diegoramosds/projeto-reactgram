//Components
import { Link, useParams } from "react-router-dom"

//Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

//Redux
import { followingUser, getUserDetails, resetMessage } from '../../slices/userSlice';
import { AppDispatch, RootState } from "../../store"
import { getUserPhotos } from "../../slices/photoSlice"
import ModalFollowers from "../../components/ModalFollowers";
import { BiGrid, BiImage, BiUserCheck, BiUserPlus } from "react-icons/bi";
import PhotoUser from "../../components/PhotoUser";
import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";

const Profile = () => {

    const {id} = useParams()

    const dispatch: AppDispatch = useDispatch()


    const {user, followers} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo)

    const [followersModal, setFollowersModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [photoLoading, setLoading] = useState(false);

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }
}, [dispatch, id, followers]);

    useEffect(() => {
      if (visibleCount < photos.length) {
        setLoading(true)
        const timer = setTimeout(() => {
          setVisibleCount(prev => prev + 5);
          setLoading(false)
        }, 2000)

      return () => clearTimeout(timer);
        }
    },[photos.length, visibleCount])
 //Start following
    const handleFollowing = () => {
      dispatch(followingUser(user?._id as string));

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
    <div className="md:w-2/3 mx-auto mt-2">
          <div className="flex flex-col gap-3 items-center">
                <PhotoUser user={user} sizeImage="150px" sizeIcon="100px"/>
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
              <div className="flex items-center justify-center  gap-5 mt-4 info-profile md:gap-10">
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
          <div className="flex justify-end items-center  px-10 py-2">
            <div className="flex items-center justify-center cursor-pointer">
                {user && userAuth?._id !== id  ? (
                  Array.isArray(user?.followers) && user?.followers.some((follower) => follower.userId?.includes(userAuth?._id as string)) ?
                  <p className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-300
                  rounded-full p-1 px-3" onClick={handleFollowing}><span>
                    <BiUserCheck size={20}/></span>Seguindo</p>
                    : <p className="flex items-center gap-1 border bg-zinc-100 hover:bg-zinc-300 cursor-pointer text-zinc-900
                  rounded-full p-1 px-3" onClick={handleFollowing}><span>
                    <BiUserPlus size={20}/></span>Seguir</p>
                ) : ""}

            </div>
            {followersModal && (
              <ModalFollowers
              closeModal={followersCloseModal}
              user={user}
              userAuth={userAuth}
              textModal="Seguidores"
              textInfo="Esse usuário ainda não possui seguidores"
              dataType="followers"
              />
            )}
                {followingModal && (
                        <ModalFollowers
                        closeModal={followingCloseModal}
                        user={user}
                        userAuth={userAuth}
                        textModal="Seguindo"
                        textInfo="Esse usuário ainda não segue ninguém"
                        dataType="following"
                        />
                            )}
          </div>
            <div className="flex flex-col flex-wrap">
                <div className="border-t border-b border-zinc-900 p-3">
                  <h2 className="flex items-center gap-1 justify-center text-lg w-1/6 mx-auto border-b-[3px] p-1"><BiGrid />Publicações</h2>
                </div>
                <div className="">
                    {photos && photos.slice(0, visibleCount).map((photo) => (
                    <div key={photo._id} className="">
                        <PostCard photo={photo} isPhotoDetail={false}/>
                    </div>
                    ))}
                    {photos.length === 0 &&  (
                      <p className="flex flex-col text-lg justify-center items-center mt-10">
                                        <BiImage size={100}/>
                                        Não há publicações
                      </p>)}
                </div>
            </div>
            {photoLoading && (
                          <Loading />
                        )}
    </div>
    )}

export default Profile