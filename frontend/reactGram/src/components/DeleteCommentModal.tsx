
interface CommentProps{
  photoId: string,
  _id: string
}
interface ModalProps {
  handleRemoveComment: (photoId: string, commentId: string) => void,
  comment: Partial<CommentProps>,
  handleCloseModalDeleteComment: () => void
}

const DeleteCommentModal = ({handleRemoveComment, comment, handleCloseModalDeleteComment}: ModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-10">
                      <div className="w-5/12 h-1/5 mx-auto mt-20 z-20 bg-zinc-900 flex justify-center items-center flex-col rounded-xl">
                        <h1>Tem certeza que deseja remover este comentário?</h1>
                            <div className="flex gap-10 mt-5 cursor-pointer">
                              <p className="bg-red-700 rounded px-5 hover:bg-red-600 text-zinc-300"
                                onClick={() => {
                                  handleRemoveComment(comment.photoId as string, comment._id as string)
                              }}
                              >Sim
                              </p>
                              <p className="bg-zinc-300 rounded px-5 hover:bg-zinc-200 text-zinc-700"
                              onClick={handleCloseModalDeleteComment}
                              >Não
                              </p>
                            </div>
                      </div>
                  </div>
  )
}

export default DeleteCommentModal