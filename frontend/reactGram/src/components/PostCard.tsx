import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../store';
import PhotoItem from "./PhotoItem";
import LikeContainer from "./LikeContainer";
import { Link } from "react-router-dom";
import { useResetComponetMessage } from "../hooks/useResetComponentMessage";
import { comments, likePhoto } from "../slices/photoSlice";
import CommentItem from "./CommentItem";
import { useState } from "react";


interface Photo {
    _id: string;
}

interface PostCardProps {
photo: Partial<Photo>
isPhotoDetail: boolean
}

const PostCard = ({photo, isPhotoDetail}: PostCardProps) => {

    const dispatch: AppDispatch = useDispatch();

    const resetMessage = useResetComponetMessage(dispatch);

    const {user} = useSelector((state : RootState) => state.auth);

    const [commentText, setCommentText] = useState("")

    interface PhotoProps {
        _id: string,
    }

    //Insert like
    const handleLike = (photo: Partial<PhotoProps>) => {
        dispatch(likePhoto(photo._id!))

        resetMessage();
    };
    //Insert comment
    const handleComment = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentData = {
        comment: commentText,
        id: photo._id
        }
        dispatch(comments(commentData))

        setCommentText("");

        resetMessage();
    }


    return (
        <div>
            <div className="bg-zinc-900/30 w-[95%]  min-h-[500px] mx-auto mt-14 mb-32 rounded-xl shadow-md border border-zinc-900
            flex flex-col justify-between md:w-[45%] md:min-h-[680px]">
                <PhotoItem photo={photo}/>
                <LikeContainer photo={photo} user={user} handleLike={handleLike}/>

                {!isPhotoDetail && (
                <Link to={`/photos/${photo._id}`}>
                                <p className="text-center p-3 bg-zinc-900/70 text-sm hover:bg-zinc-900/74 hover:text-zinc-300 rounded-b-xl">Veja detalhes</p>
                                </Link>
                )}

                {isPhotoDetail && (
                    <div className="p-6">
                        <CommentItem
                        commentText={commentText}
                        handleComment={handleComment}
                        photo={photo}
                        setCommentText={setCommentText}/>
                    </div>
                )}
            </div>
        </div>
        )}

export default PostCard