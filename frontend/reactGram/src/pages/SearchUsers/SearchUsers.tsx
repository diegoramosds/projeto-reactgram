import { useSelector } from "react-redux"
import { uploads } from "../../utils/config"
import { RootState } from "../../store"
import { Link } from "react-router-dom"


const SearchUsers = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      {user && Array.isArray(user) && user.length > 0 ? (
        user.map((u) => (
          <div key={u._id} className="flex items-center">
            {u.profileImage && (
              <img
                src={`${uploads}/users/${u.profileImage}`}
                alt={u.name}
                className="w-28 h-28 rounded-full p-4"
              />
            )}
            <p>
              <Link to={`/users/profile/${u._id}`}>{u.name}</Link>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center mt-10">Não foi encontrado nenhum usuário</p>
      )}
    </div>
  );
};

export default SearchUsers;
