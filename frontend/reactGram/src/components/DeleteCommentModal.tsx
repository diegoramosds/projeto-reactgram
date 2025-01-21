

const DeleteCommentModal = ({handleRemoveComment, comment, handleCloseModalDeleteComment}) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-10">
                      <div className="w-5/12 h-1/5 mx-auto mt-20 z-20 bg-zinc-900 flex justify-center items-center flex-col rounded">
                        <h1>Tem certeza que deseja remover este comentário?</h1>
                            <div className="flex gap-10 mt-5">
                              <p className="bg-red-600 rounded px-5 hover:bg-red-700"
                                onClick={() => {
                                  handleRemoveComment(comment.photoId, comment._id)
                              }}
                              >Sim
                              </p>
                              <p className="bg-sky-700 rounded px-5 hover:bg-sky-800"
                              onClick={handleCloseModalDeleteComment}
                              >Não
                              </p>
                            </div>
                      </div>
                  </div>
  )
}

export default DeleteCommentModal