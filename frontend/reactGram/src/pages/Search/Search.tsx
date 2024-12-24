import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';
import { AppDispatch, RootState } from '../../store';
import PhotoItem from '../../components/PhotoItem';
import { useEffect } from 'react';
import { likePhoto, resetMessage, searchPhoto } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer';
import { Link } from 'react-router-dom';


const Search = () => {
const query = useQuery();
const search = query.get("q");

const {user} = useSelector((state : RootState) => state.auth);
const {photos, loading, photo} = useSelector((state: RootState) => state.photo)

const dispatch: AppDispatch  = useDispatch()

useEffect(()=> {
    dispatch(searchPhoto(search))
}, [dispatch, search])


//load photo data
if(loading) {
    <p>Carregando</p>
}

  //Insert like
  const handleLike = () => {
    dispatch(likePhoto(photo._id!))
    resetMessage();
  };

return (
    <div>
        <p>Search: {search}</p>
        <div className=''>
            {photos && photos.map((photo) =>(
                <div key={photo._id}>
                <PhotoItem photo={photo}/>
                <LikeContainer handleLike={handleLike} photo={photo} user={user}/>
                </div>
            ))}
        </div>
        {photos && photos.length === 0 && (
            <div>Nao ha publicacoes relacionados a sua busca <Link to={`/users/${user?._id}`}>Clique aqui e publique</Link></div>
        )}
    </div>
)
}

export default Search