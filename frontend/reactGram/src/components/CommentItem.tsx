import { Link } from "react-router-dom";

import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal";
import { removeComment } from "../slices/photoSlice";
import { useResetComponetMessage } from "../hooks/useResetComponentMessage";
import { BiUserCircle } from "react-icons/bi";

interface CommentProps {
  _id: string;
  userId: string;
  userName: string;
  userImage: string;
  comment: string;
}

interface PhotoProps {
  _id: string;
  comments: Partial<CommentProps>[];
}
interface CommentItemProps {
  photo: Partial<PhotoProps>;
  handleComment: (e: React.ChangeEvent<HTMLFormElement>) => void;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
}

const CommentItem = ({
  photo,
  handleComment,
  commentText,
  setCommentText,
}: CommentItemProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
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

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponetMessage(dispatch);

  const handleRemoveComment = (photoId: string, commentId: string) => {
    const commentData = {
      photoId,
      commentId,
    };
    dispatch(removeComment(commentData));
    resetMessage();
    setDeleteCommentModal(false);
  };

  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <div>
      {Array.isArray(photo.comments) && (
        <>
          <h3>Comentários({photo.comments?.length})</h3>
          <form onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Insira seu comentário..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText || ""}
            />
            <input type="submit" value="Enviar" />
          </form>
          {photo.comments?.length === 0 && <p>Não há comentarios...</p>}
          {photo.comments.slice(0, visibleCount).map((comment, i) => (
            <div
              key={i}
              className=" bg-zinc-900 hover:bg-zinc-900/90 text-zinc-400
                        border-zinc-800 rounded-lg p-1 px-1 mt-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {comment.userImage ? (
                  <Link to={`/users/profile/${comment.userId}`}>
                    <img
                      src={comment.userImage}
                      alt={comment.userName}
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to={`/users/profile/${comment.userId}`}>
                    <BiUserCircle size={30} className="m-1" />
                  </Link>
                )}
                <div>
                  <Link to={`/users/profile/${comment.userId}`}>
                    <p className="text-base font-medium">{comment.userName}</p>
                  </Link>
                  <div>
                    <p className="break-words w-40 md:w-96">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer">
                {comment.userId === user?._id && (
                  <p
                    onClick={handleOpenModalDeleteComment}
                    className="hover:bg-zinc-800 p-2 rounded-full
                          transition-colors duration-200"
                  >
                    <MdClose />
                  </p>
                )}
              </div>
              {deleteCommentModal && (
                <DeleteCommentModal
                  commentText="Deseja remover este comentário?"
                  comment={comment}
                  isComment={true}
                  photoId=""
                  handleRemovePhoto={() => {}}
                  handleCloseModalDeleteComment={handleCloseModalDeleteComment}
                  handleRemoveComment={handleRemoveComment}
                />
              )}
            </div>
          ))}
          {visibleCount < photo.comments.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="text-xs flex justify-center items-center mx-auto mt-5"
            >
              Ver mais comentários
            </button>
          ) : photo.comments.length > 4 ? (
            <button
              onClick={() => setVisibleCount(4)}
              className="text-xs flex justify-center items-center mx-auto mt-5"
            >
              Ver menos comentários
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};
export default CommentItem;
