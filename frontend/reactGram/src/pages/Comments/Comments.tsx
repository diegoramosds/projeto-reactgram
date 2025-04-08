import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllComments, removeComment } from "../../slices/photoSlice";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useResetComponetMessage } from "../../hooks/useResetComponentMessage";
import { getUserDetails } from "../../slices/userSlice";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import { LuMessageSquare } from "react-icons/lu";
import Loading from "../../components/Loading";

const Comments = () => {
  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { photo } = useSelector((state: RootState) => state.photo);

  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [photoLoading, setLoading] = useState(false);

  useEffect(() => {
    if (photo.comments && visibleCount < photo.comments.length) {
      setLoading(true);
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 5);
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [photo.comments, visibleCount]);

  useEffect(() => {
    if (userAuth?._id) {
      dispatch(getAllComments(userAuth._id));
      dispatch(getUserDetails(userAuth?._id));
    }
  }, [dispatch, userAuth]);

  useEffect(() => {
    if (deleteCommentModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-auto");
    }
    return () => document.body.classList.remove("overflow-hidden");
  });

  const handleOpenModalDeleteComment = () => {
    setDeleteCommentModal(true);
  };

  const handleCloseModalDeleteComment = () => {
    setDeleteCommentModal(false);
  };
  const handleRemoveComment = (photoId: string, commentId: string) => {
    const commentData = {
      photoId,
      commentId,
    };
    dispatch(removeComment(commentData));
    resetMessage();
    setDeleteCommentModal(false);
  };
  return (
    <div>
      {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
        photo.comments.slice(0, visibleCount).map((comment) => (
          <div key={comment._id} className="">
            {userAuth?._id === comment.userId && (
              <div className="m-5 flex md:gap-32 p-2 items-center justify-around border-b rounded border-zinc-900">
                <p>Comentário: {comment.comment}</p>
                <Link to={`/photos/${comment.photoId}`}>
                  <img
                    src={`${uploads}/photos/${comment.photoImage}`}
                    alt=""
                    className="h-20 w-24 rounded-full"
                  />
                </Link>
                <p>
                  <MdClose
                    onClick={handleOpenModalDeleteComment}
                    className="cursor-pointer"
                  />
                </p>
              </div>
            )}
            {deleteCommentModal && (
              <DeleteCommentModal
                comment={comment}
                isComment={true}
                handleRemovePhoto={() => {}}
                photoId=""
                handleCloseModalDeleteComment={handleCloseModalDeleteComment}
                handleRemoveComment={handleRemoveComment}
              />
            )}
          </div>
        ))
      ) : (
        <p className="flex flex-col gap-2 items-center text-center text-zinc-400 text-base">
          <span>
            <LuMessageSquare size={50} />
          </span>
          Você ainda não comentou em nenhuma publicação
        </p>
      )}
      {photoLoading && <Loading />}
    </div>
  );
};
export default Comments;
