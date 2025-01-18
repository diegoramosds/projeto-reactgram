import { useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';
import { AppDispatch } from '../../store';
import { useEffect, useState } from 'react';
import { searchPhoto } from '../../slices/photoSlice';

import {  searchUser } from '../../slices/userSlice';
import SearchPhotos from '../SearchPhotos/SearchPhotos';
import SearchUsers from '../SearchUsers/SearchUsers';


const Search = () => {
const query = useQuery();
const search = query.get("q");

const dispatch: AppDispatch  = useDispatch()

useEffect(()=> {
    if(search) {
    dispatch(searchPhoto(search))
    dispatch(searchUser(search))
    setSearchPhotos(true);
    }
}, [dispatch, search])

const [searchUsers, setSearchUsers] = useState();
const [searchPhotos, setSearchPhotos] = useState();

const handleUsers = () => {
    setSearchUsers(true);

    setSearchPhotos(false);

}

const handlePhotos = () => {
    setSearchPhotos(true);

    setSearchUsers(false);
}

return (
    <div>
        <div className='flex m-3 gap-5 justify-center'>
            {search && (
              <div className='flex gap-5'>
                <p onClick={handlePhotos}>Publicações</p>
                <p onClick={handleUsers}>Usuários</p>
              </div>
            )}
        </div>
        {!search && (
            <p className='text-center mt-10'>Busque por publicações e usuário aqui</p>
        )}
        <div className=''>
            {searchPhotos && (
                <SearchPhotos />
            )}
        </div>
        <div className=''>
            {searchUsers && (
                <SearchUsers />
            )}
        </div>
    </div>
)
}

export default Search