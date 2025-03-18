import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"
import { likePhoto, resetMessage } from "../../slices/photoSlice"
import { BiImage } from "react-icons/bi"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"


const SearchPhotos = () => {

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo);

     const [visibleCount, setVisibleCount] = useState(5);
     const [photoLoading, setLoading] = useState(false);
    
        useEffect(() => {
          if (photos && visibleCount < photos.length) {
            setLoading(true)
            const timer = setTimeout(() => {
              setVisibleCount(prev => prev + 5);
              setLoading(false)
            }, 2000)
    
          return () => clearTimeout(timer);
            }
        },[photos, visibleCount])
    

    const dispatch: AppDispatch = useDispatch()

    interface PhotoProps {
        _id: string,
    }
      //Insert like
        const handleLike = (photo: Partial<PhotoProps>) => {
        dispatch(likePhoto(photo._id!))
        resetMessage();
    };
return (
    <div>
        <div>
        {photos && photos.slice(0, visibleCount).map((photo) =>(
            <div key={photo._id} className="bg-zinc-900/30 w-11/12 md:w-[40%] md:min-h-[680px] mx-auto mt-14 mb-32 rounded-xl shadow-md border border-zinc-900 
        flex flex-col justify-between">
            <PhotoItem photo={photo} />
            <LikeContainer handleLike={handleLike} photo={photo} user={userAuth}/>
            </div>
        ))}
    </div>
        {photos && photos.length === 0 && (
            <div className="">
                <p className="flex flex-col md:text-lg p-0.5 justify-center items-center mt-10">
                    <BiImage size={100}/>
                    Não há publicações relacionado a sua busca
                    </p>
            </div>
        )}
        {photoLoading && (
          <Loading />
          )}
</div>
)
}

export default SearchPhotos