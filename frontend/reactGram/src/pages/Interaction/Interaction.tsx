import { useEffect, useState } from "react"
import { Likes } from "../Likes/Likes"
import Comments from "../Comments/Comments"

const Interaction = () => {

  const [findComments, setFindComments] = useState(false);
  const [findLikes, setFindLikes] = useState(false);
  const [firstSearchCompleted, setFirstSearchCompleted] = useState(false);

  useEffect(() => {
      if (!firstSearchCompleted) {
        setFindComments(true);
        setFirstSearchCompleted(true);
      } // else {
      //   setFindLikes(false);
      //   setFindComments(false);
      //   setFirstSearchCompleted(false);
      // }
  }, [firstSearchCompleted]);


  const handleComments = () => {
    setFindComments(true)
    setFindLikes(false)
  }

  const handleLikes = () => {
    setFindLikes(true)
    setFindComments(false)
  }
  return (
    <div className="flex justify-center flex-col gap-20 mt-5">
        <div className="flex justify-center gap-10">
          <h2 onClick={handleComments} className={
                  findComments ? "text-sky-700/80 border-b border-sky-700" : ""
                }>Comentários</h2>
          <h2 onClick={handleLikes} className={
                  findLikes ? "text-sky-700/80 border-b border-sky-700" : ""
                }>Curtidas</h2>
        </div>

      {findComments && (
        <Comments />
      )}

      {findLikes && (
        <Likes />
      )}
      </div>
  )
}

export default Interaction