import { useDispatch } from "react-redux";
import { useQuery } from "../../hooks/useQuery";
import { AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { searchPhoto } from "../../slices/photoSlice";
import { searchUser } from "../../slices/userSlice";
import SearchPhotos from "../SearchPhotos/SearchPhotos";
import SearchUsers from "../SearchUsers/SearchUsers";
import { HiUserGroup } from "react-icons/hi2";


const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch: AppDispatch = useDispatch();

  const [searchUsers, setSearchUsers] = useState(false);
  const [searchPhotos, setSearchPhotos] = useState(false);
  const [firstSearchCompleted, setFirstSearchCompleted] = useState(false);

 
  useEffect(() => {
    if (search) {
      dispatch(searchPhoto(search));
      dispatch(searchUser(search));

      
      if (!firstSearchCompleted) {
        setSearchPhotos(true);
        setFirstSearchCompleted(true);
      }
    } else {
      setSearchPhotos(false);
      setSearchUsers(false);
      setFirstSearchCompleted(false);
    }
  }, [dispatch, search, firstSearchCompleted]);

  const handleUsers = () => {
    setSearchUsers(true);
    setSearchPhotos(false);
  };

  const handlePhotos = () => {
    setSearchPhotos(true);
    setSearchUsers(false);
  };

  return (
    <div>
      <div className="flex mt-5 border-b border-zinc-900 w-1/2 mx-auto">
        {search && (
          <div className="flex gap-8 text-lg">
            <p
              onClick={handlePhotos}
              className={
                searchPhotos ? "text-zinc-200 border-b-2 border-zinc-200 p-3" : "text-zinc-400 p-3"
              }
            >
              Publicações
            </p>
            <p
              onClick={handleUsers}
              className={
                searchUsers ? "text-zinc-200 border-b-2 border-zinc-200 p-3" : "text-zinc-400 p-3"
              }
            >
              Usuários
            </p>
          </div>
        )}
      </div>
      {!search && (
        <p  className="flex flex-col items-center text-lg mt-10 gap-3">
          <span>
            <HiUserGroup size={70}/>
          </span>
          Busque por publicações e usuários aqui
        </p>
      )}
      <div>
        {searchPhotos && <SearchPhotos /> }
      </div>
      <div>
        {searchUsers && <SearchUsers /> }
      </div>
    </div>
  );
};

export default Search;
