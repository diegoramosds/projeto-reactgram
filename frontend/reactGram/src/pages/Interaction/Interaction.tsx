import { useEffect, useState } from "react";
import { Likes } from "../Likes/Likes";
import Comments from "../Comments/Comments";

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
    setFindComments(true);
    setFindLikes(false);
  };

  const handleLikes = () => {
    setFindLikes(true);
    setFindComments(false);
  };
  return (
    <div className="flex items-center flex-col gap-20 mt-5">
      <div className="flex gap-10 border-b border-zinc-900 md:w-1/2 mx-auto">
        <h2
          onClick={handleComments}
          className={
            findComments
              ? "text-zinc-200 border-b-2 border-zinc-200 p-3"
              : "text-zinc-400 p-3"
          }
        >
          Comentários
        </h2>
        <h2
          onClick={handleLikes}
          className={
            findLikes
              ? "text-zinc-200 border-b-2 border-zinc-200 p-3"
              : "text-zinc-400 p-3"
          }
        >
          Curtidas
        </h2>
      </div>

      {findComments && <Comments />}

      {findLikes && <Likes />}
    </div>
  );
};

export default Interaction;
