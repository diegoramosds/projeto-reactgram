import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';
import { AppDispatch, RootState } from '../../store';
import PhotoItem from '../../components/PhotoItem';
import { useEffect } from 'react';
import { likePhoto, resetMessage, searchPhoto } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer';
import { Link } from 'react-router-dom';
import { getUserDetails, searchUser } from '../../slices/userSlice';
import { uploads } from '../../utils/config';


const Search = () => {
const query = useQuery();
const search = query.get("q");

const {user: userAuth} = useSelector((state : RootState) => state.auth);
const {user} = useSelector((state : RootState) => state.user);
const {photos, loading} = useSelector((state: RootState) => state.photo)

const dispatch: AppDispatch  = useDispatch()

useEffect(()=> {
    dispatch(searchPhoto(search))
    dispatch(searchUser(search))

}, [dispatch, search])

//load photo data
if(loading) {
    <p>Carregando</p>
}

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
        <p>Search: {search}</p>
        <div className=''>
        {user?.profileImage && (
          <div>
            {user._id}
          </div>
                )}
            {photos && photos.map((photo) =>(
                <div key={photo._id}>
                <PhotoItem photo={photo}/>
                <LikeContainer handleLike={handleLike} photo={photo} user={userAuth}/>
                </div>
            ))}
        </div>
        {photos && photos.length === 0 && (
            <div>Nao ha publicacoes relacionados a sua busca <Link to={`/users/${userAuth?._id}`}>Clique aqui e publique</Link></div>
        )}
    </div>
)
}

export default Search