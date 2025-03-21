import { useDispatch, useSelector } from "react-redux";
import { uploads } from "../../utils/config";
import { AppDispatch, RootState } from "../../store";
import { Link } from "react-router-dom";
import { BiUserCheck, BiUserPlus } from "react-icons/bi";
import { followingUser, resetMessage } from "../../slices/userSlice";
import { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";
import Loading from "../../components/Loading";

const SearchUsers = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user: users } = useSelector((state: RootState) => state.user);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  interface User {
    _id: string;
    name: string;
    bio: string;
    profileImage?: string;
    followers?: { userId: string }[];
  }

  const [localUsers, setLocalUsers] = useState<User[]>(Array.isArray(users) ? users : []);

  const [visibleCount, setVisibleCount] = useState(5);
  const [photoLoading, setLoading] = useState(false);

      useEffect(() => {
        if (localUsers && visibleCount < localUsers.length) {
          setLoading(true)
          const timer = setTimeout(() => {
            setVisibleCount(prev => prev + 5);
            setLoading(false)
          }, 2000)

        return () => clearTimeout(timer);
          }
      },[localUsers, visibleCount])

  useEffect(() => {
    setLocalUsers(Array.isArray(users) ? users : []);
  }, [users]);

  const handleFollowing = async (userId: string) => {
    await dispatch(followingUser(userId));

    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId
          ? {
              ...user,
              followers: (user.followers ?? []).some(
                (follower) => follower.userId === userAuth?._id
              )
                ? (user.followers ?? []).filter(
                    (follower) => follower.userId !== userAuth?._id
                  )
                : [
                  ...(user.followers ?? []),
                    { userId: userAuth?._id as string },
                  ],
            }
          : user
      )
    );
    setTimeout(() => {
      dispatch(resetMessage());
    }, 1000);
  };

  return (
    <div className="mt-10">
      {localUsers.length > 0 ? (
        localUsers.slice(0, visibleCount).map((u) => (
        <div
            key={u._id}
            className="flex items-center justify-between w-11/12 md:w-5/12 mx-auto
          border-t border-zinc-900/30 hover:bg-zinc-900/30 rounded-2xl
          px-2 first:border-transparent transition-all duration-200"
          >
            {u.profileImage && (
              <div className="flex items-center">
                <div>
                  <Link to={`/users/profile/${u._id}`}>
                    <img
                      src={`${uploads}/users/${u.profileImage}`}
                      alt={u.name}
                      className="w-20 h-20 rounded-full p-4"
                    />
                  </Link>
                </div>
                <div>
                  <p className="text-lg font-medium">
                    <Link to={`/users/profile/${u._id}`}>{u.name}</Link>
                  </p>
                  <p className="text-zinc-400">{u.bio}</p>
                </div>
              </div>
            )}
            <p className="">
              {userAuth?._id !== u._id ? (
                Array.isArray(u?.followers) &&
                u?.followers.some(
                  (follower: { userId: string }) => follower.userId === userAuth?._id
                ) ? (
                  <p
                    className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-300
              rounded-full p-1 px-3"
                    onClick={() => handleFollowing(u._id)}
                  >
                    <span>
                      <BiUserCheck size={20} />
                    </span>
                    Seguindo
                  </p>
                ) : (
                  <p
                    className="flex items-center gap-1 border bg-zinc-100 hover:bg-zinc-300 cursor-pointer text-zinc-900
                    rounded-full p-1 px-3"
                    onClick={() => handleFollowing(u._id)}
                  >
                    <span>
                      <BiUserPlus size={20} />
                    </span>
                    Seguir
                  </p>
                )
              ) : (
                ""
              )}
            </p>
          </div>
        ))
      ) : (
          <p  className="flex flex-col items-center text-lg mt-10 gap-3">
                    <span>
                      <TbUsers size={100}/>
                    </span>
          Não foi encontrado nenhum usuário
                  </p>
      )}
      {photoLoading && (
          <Loading />
          )}
    </div>
  );
};

export default SearchUsers;
