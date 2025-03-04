
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store";

import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const Home = () => {

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);

  const {user} = useSelector((state : RootState) => state.auth);
  const {loading, photos} = useSelector((state: RootState) => state.photo);

   //load photo data
  useEffect(() => {
    dispatch(getAllPhotos())

  },[dispatch])


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
        <div key={photo._id} className="bg-zinc-900/30 w-[45%] min-h-[680px] mx-auto mt-14 mb-32 rounded-xl shadow-md border border-zinc-900 
        flex flex-col justify-between">
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
            <Link to={`/photos/${photo._id}`}>
            <p className="text-center p-3 bg-zinc-900/70 text-sm hover:bg-zinc-900/74 hover:text-zinc-300 rounded-b-xl">Veja detalhes</p>
            </Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <p className="text-center mt-10">Ainda não ha publicações <Link to={`/users/${user?._id}`}>Clique aqui</Link> e faça um publicação</p>
      )}
    </div>
  )
}
export default Home;