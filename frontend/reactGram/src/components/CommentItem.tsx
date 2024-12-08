import { Link } from "react-router-dom"
import { uploads } from "../utils/config"
import { FaClosedCaptioning } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux";
import { RootState } from "../store";


const CommentItem = ({photo, handleComment, handleRemoveComment, commentText, setCommentText}) => {

const { user } = useSelector((state : RootState) => state.auth);

    return (
        <div>
          {photo.comments && (
              <>
              <h3>comentários({photo.comments?.length})</h3>
                <form onSubmit={handleComment}>
                  <input type="text"
                  placeholder="Insira seu comentário..."
                  onChange={((e) => setCommentText(e.target.value))}
                  value={commentText || ""}
                   />
                  <input type="submit" value="Enviar" />
                 </form>
                   {photo.comments?.length === 0 && <p>Não há comentarios...</p>}
                   {photo.comments.map((comment, i) => (
                    <div key={i} className=" bg-zinc-800 text-zinc-400  border-zinc-800 rounded-lg m-2 px-2 flex items-center justify-between">
                      <div>
                        {comment.userImage && (
                         <img src={`${uploads}/users/${comment.userImage}`}
                          alt={comment.userName} />
                        )}
                        <Link to={`/users/${comment.userId}`}>
                            {comment.userName}:
                        </Link>
                        <div className="">
                          {comment.comment}
                        </div>
          
                      </div>
                      <div className="cursor-pointer">
                        {comment.userId === user?._id && (
                          <p onClick={() => handleRemoveComment(photo._id, comment._id)}><MdClose /></p>
                        )}
                          </div>
                      
                      </div>
                   ))}
              </>
            )}
        </div>
      )
  }
export default CommentItem
