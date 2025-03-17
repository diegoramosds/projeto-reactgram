import { useDispatch } from "react-redux";
import { useQuery } from "../../hooks/useQuery";
import { AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { searchPhoto } from "../../slices/photoSlice";
import { searchUser } from "../../slices/userSlice";
import SearchPhotos from "../SearchPhotos/SearchPhotos";
import SearchUsers from "../SearchUsers/SearchUsers";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";


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

    const [searchInput, setSearch] = useState("");
  
    const navigate = useNavigate();
  
      // Search
      const handleSearh = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("")
        if(searchInput) {
        return navigate(`/search?q=${searchInput}`)
        }
      }
  return (
    <div>
      <div className="flex mt-5 p-2 w-11/12 md:w-1/2 mx-auto">
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
      {window.innerWidth < 650 && !searchUsers &&  !searchPhotos && (
        <form className="relative flex items-center justify-center border-b border-zinc-900" onSubmit={handleSearh}>
                <BsSearch className="absolute left-[60%] top-3 text-zinc-500"/>
                <input type="text"
                placeholder="Pesquisar"
                value={searchInput}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-2 py-2 rounded-xl bg-zinc-900 text-zinc-200 border focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent md:pl-10 md:pr-16 md:py-2"/>
                </form>
      )}
      {!search && (
        <p  className="flex flex-col items-center mt-10 md:text-lg gap-3 ">
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
