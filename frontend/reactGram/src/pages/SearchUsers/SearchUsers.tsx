import { useSelector } from "react-redux"
import { uploads } from "../../utils/config"
import { RootState } from "../../store"
import { Link } from "react-router-dom"


const SearchUsers = () => {
const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="mt-10 flex flex-col">
      {user && Array.isArray(user) && user.length > 0 ? (
        user.map((u) => (
          <div key={u._id} className="flex items-center">
            {u.profileImage && (
              <img
                src={`${uploads}/users/${u.profileImage}`}
                alt={u.name}
                className="w-20 h-20 rounded-full p-4"
              />
            )}
          
                <div className="flex justify-center items-center gap-5">
                  <div>
                    <p className="text-lg font-medium">
                      <Link to={`/users/profile/${u._id}`}>{u.name}</Link>
                    </p>
                    <p className="text-zinc-400">{u.bio}</p>
                  </div>
                  <div>
                    <p className="border bg-zinc-100 hover:bg-zinc-300 cursor-pointer text-zinc-900 rounded-full p-1 px-5">Seguir</p>
                  </div>
                </div>
              </div>
        ))
      ) : (
        <p className="text-center mt-10">Não foi encontrado nenhum usuário</p>
      )}
    </div>
  );
};

export default SearchUsers;
