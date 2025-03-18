
import { Link } from "react-router-dom";
import { BiImage } from "react-icons/bi";
import PostCard from "../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllPhotos } from "../../slices/photoSlice";
import Loading from "../../components/Loading";

const Home = () => {

  const dispatch: AppDispatch = useDispatch();

  const {user} = useSelector((state : RootState) => state.auth);
  const {user: users} = useSelector((state : RootState) => state.user);
  const {photos, loading} = useSelector((state: RootState) => state.photo);

  const [visibleCount, setVisibleCount] = useState(5);
  const [photoLoading, setLoading] = useState(false);

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

    //load photo data
    useEffect(() => {
      dispatch(getAllPhotos())
  },[dispatch, users?._id])

  if(loading) {
    return <Loading />
}

  return (
    <div>
      {Array.isArray(photos) && photos.slice(0, visibleCount).map((photo) => (
        <div key={photo._id}>
          <PostCard photo={photo} isPhotoDetail={false}/>
        </div>
      ))}
      <div>
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
      {photoLoading && (
      <Loading />
      )}
    </div>
  )
}
export default Home;