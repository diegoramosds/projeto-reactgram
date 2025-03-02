import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"
import { likePhoto, resetMessage } from "../../slices/photoSlice"
import { Link } from "react-router-dom"


const SearchPhotos = () => {

    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const {photos} = useSelector((state: RootState) => state.photo)

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
        <div className='w-1/2 mx-auto pt-5'>
        {photos && photos.map((photo) =>(
            <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer handleLike={handleLike} photo={photo} user={userAuth}/>
            </div>
        ))}
    </div>
        {photos && photos.length === 0 && (
            <div>
                <p className="text-center">Nao ha publicacoes relacionados a sua busca <Link to={`/users/${userAuth?._id}`}>Clique aqui e publique</Link></p>
            </div>
        )}
</div>
)
}

export default SearchPhotos