import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

import { BsFillEyeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getUserDetails, clenupLikes } from "../../slices/userSlice";
import { LuHeart } from "react-icons/lu";
import Loading from "../../components/Loading";

export const Likes = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  const [visibleCount, setVisibleCount] = useState(5);
  const [photoLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.likedPhotos && visibleCount < user?.likedPhotos.length) {
      setLoading(true);
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 5);
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user?.likedPhotos, visibleCount]);

  //load user data
  useEffect(() => {
    if (userAuth?._id) {
      dispatch(getUserDetails(userAuth?._id));
      dispatch(clenupLikes());
    }
  }, [dispatch, userAuth]);

  return (
    <div className="w-full">
      {user && user._id === userAuth?._id && user.likedPhotos.length > 0 ? (
        <div>
          {user.likedPhotos.slice(0, visibleCount).map((liked) => (
            <div
              key={liked.photoId}
              className="border-b w-1/2 mx-auto border-zinc-900 m-2 flex justify-around items-center md:gap-36"
            >
              <img
                src={
                  liked.photoImage?.startsWith("http")
                    ? liked.photoImage
                    : `${uploads}/photos/${liked.photoImage}`
                }
                alt=""
                className="w-16 h-16 md:w-24 md:h-24 rounded-full"
              />
              <div>
                <Link to={`/photos/${liked.photoId}`}>
                  <p>
                    <BsFillEyeFill />
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex flex-col gap-2 items-center text-center text-zinc-400 text-base">
          <span>
            <LuHeart size={50} />
          </span>
          Você ainda não curtiu nenhuma publicação
        </p>
      )}
      {photoLoading && <Loading />}
    </div>
  );
};
