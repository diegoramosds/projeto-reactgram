//Components
import { useParams } from "react-router-dom";

//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

//redux
import PostCard from "../../components/PostCard";
import { getPhotoById } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const {photo} = useSelector((state: RootState) => state.photo);

  //load photo data
  useEffect(() => {
  dispatch(getPhotoById(id))

  },[dispatch, id])

  return (
    <div className="">
      <PostCard photo={photo} isPhotoDetail={true}/>
    </div>
  )
}

export default Photo;