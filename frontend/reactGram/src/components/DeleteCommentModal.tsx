interface CommentProps {
  photoId: string;
  _id: string;
}
interface ModalProps {
  handleRemoveComment: (photoId: string, commentId: string) => void;
  handleRemovePhoto: (photoId: string) => void;
  comment: Partial<CommentProps>;
  handleCloseModalDeleteComment: () => void;
  isComment?: boolean;
  photoId: string;
  commentText: string;
}

const DeleteCommentModal = ({
  handleRemoveComment,
  comment,
  commentText,
  photoId,
  handleCloseModalDeleteComment,
  handleRemovePhoto,
  isComment,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-10">
      <div
        className="w-11/12 md:w-5/12 md:min-h-28 mx-auto mt-20 z-20 bg-zinc-900 flex j
                      ustify-center items-center flex-col rounded-xl p-3"
      >
        <h1>{commentText}</h1>
        <div className="flex gap-10 mt-5 cursor-pointer">
          {isComment ? (
            <p
              className="bg-red-700 rounded px-6 hover:bg-red-600 text-zinc-300"
              onClick={() => {
                handleRemoveComment(
                  comment.photoId as string,
                  comment._id as string
                );
              }}
            >
              Sim
            </p>
          ) : (
            <p
              className="bg-red-700 rounded px-6 hover:bg-red-600 text-zinc-300"
              onClick={() => {
                handleRemovePhoto(photoId);
              }}
            >
              Sim
            </p>
          )}

          <p
            className="bg-zinc-300 rounded px-5 hover:bg-zinc-200 text-zinc-700"
            onClick={handleCloseModalDeleteComment}
          >
            Não
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
