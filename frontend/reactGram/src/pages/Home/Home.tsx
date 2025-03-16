
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store";

import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { BiImage } from "react-icons/bi";
import { getUserDetails } from "../../slices/userSlice";

const Home = () => {

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);

  const {user} = useSelector((state : RootState) => state.auth);
  const {user: users} = useSelector((state : RootState) => state.user);
  const {loading, photos} = useSelector((state: RootState) => state.photo);

   //load photo data
  useEffect(() => {
    dispatch(getAllPhotos())
    dispatch(getUserDetails(users?._id as string))
  },[dispatch, users?._id])


  interface PhotoProps {
    _id: string,
  }

  //Insert like
  const handleLike = (photo: Partial<PhotoProps>) => {
    dispatch(likePhoto(photo._id!))

    resetMessage();
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      {Array.isArray(photos) && photos.map((photo) => (
        <div key={photo._id} className="bg-zinc-900/30 w-[95%]  min-h-[500px] mx-auto mt-14 mb-32 rounded-xl shadow-md border border-zinc-900 
        flex flex-col justify-between md:w-[45%] md:min-h-[680px]">
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
            <Link to={`/photos/${photo._id}`}>
            <p className="text-center p-3 bg-zinc-900/70 text-sm hover:bg-zinc-900/74 hover:text-zinc-300 rounded-b-xl">Veja detalhes</p>
            </Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <p className="mt-10 text-center">
          <span className="flex items-center justify-center">
             <BiImage size={100}/>
          </span>
          Ainda não ha publicações <Link to={`/users/${user?._id}`} className="bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-br 
          transition-colors duration-200">Clique aqui</Link> e faça uma publicação
        </p>
      )}
    </div>
  )
}
export default Home;