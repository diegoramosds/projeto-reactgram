import { useDispatch } from "react-redux";
import { useQuery } from "../../hooks/useQuery";
import { AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { searchPhoto } from "../../slices/photoSlice";
import { searchUser } from "../../slices/userSlice";
import SearchPhotos from "../SearchPhotos/SearchPhotos";
import SearchUsers from "../SearchUsers/SearchUsers";


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
      <div className="flex m-3 gap-5 justify-center">
        {search && (
          <div className="flex gap-5">
            <p
              onClick={handlePhotos}
              className={
                searchPhotos ? "text-sky-700/80 border-b border-sky-700" : ""
              }
            >
              Publicações
            </p>
            <p
              onClick={handleUsers}
              className={
                searchUsers ? "text-sky-700/80 border-b border-sky-700" : ""
              }
            >
              Usuários
            </p>
          </div>
        )}
      </div>
      {!search && (
        <p className="text-center text-xl mt-10">
          Busque por publicações e usuários aqui
        </p>
      )}
      <div>
        {searchPhotos && <SearchPhotos />}
      </div>
      <div>
        {searchUsers && <SearchUsers />}
      </div>
    </div>
  );
};

export default Search;
