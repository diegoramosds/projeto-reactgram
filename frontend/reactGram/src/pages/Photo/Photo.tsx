import { uploads } from "../../utils/config"

//Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getPhotoById } from "../../slices/photoSlice";


//redux 

const Photo = () => {
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {photo, error, loading, message,} = useSelector((state: RootState) => state.photo);

  //comments

  //load photo data
  useEffect(() => {
   dispatch(getPhotoById(id))

  },[dispatch, id])

  //like and comments

  if(loading) {
    return <p>Carregando...</p>
  }

  
  return (
    <div className="w-2/4 mt-0 mx-auto">
      <PhotoItem photo={photo} />
    </div>
  )
}

export default Photo;