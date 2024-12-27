
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store";

import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { useEffect } from "react";

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
    <p>Carregando</p>
  }

  return (
    <div>
      {/* <h1 className="text-center m-8 text-2xl">Veja aqui as publicações</h1> */}
      {photos && photos.map((photo) => (
        <div key={photo._id} className="w-2/4 mx-auto pb-10 mb-40 rounded-lg p-5">
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <p className="text-center mt-5 p-1  bg-sky-700/80 rounded w-2/4 mx-auto hover:bg-sky-700/100"><Link to={`/photos/${photo._id}`}>Veja detalhes</Link></p>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <p>Ainda não ha publicações <Link to={`/users/${user?._id}`}>Clique aqui</Link> e faça um publicação</p>
      )}
    </div>
  )
}
export default Home;