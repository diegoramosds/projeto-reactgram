import { uploads } from "../../utils/config"

//Components
import Message from "../../components/Message"
import { Link, useParams } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

//Hooks
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


//Redux
import { getUserDetails } from "../../slices/userSlice"
import { AppDispatch, RootState } from "../../store"
import { publishPhoto, resetMessage } from "../../slices/photoSlice"

const Profile = () => {
    

    const {id} = useParams()


    const dispatch: AppDispatch = useDispatch()

    const {user, loading} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)
    const { 
        photos, 
        error:errorPhoto, 
        loading:loadingPhoto, 
        message:messagePhoto, 
        success: successPhoto
    } = useSelector((state: RootState) => state.photo)

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");

    //New form and edit form const const = useRef(second)
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
    } 
}, [dispatch, id]);

    const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const photoData = {
        title,
        image
     }

     //Build form data
     const formData = new FormData()

     const photoFormData = Object.keys(photoData).forEach((key) => 
        formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData)

    dispatch(publishPhoto(formData))

    setTitle("")

    setTimeout(() => {
        dispatch(resetMessage())
      }, 2000)


    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
  
            setImage(image);
      }
    }

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
    <div className="w-2/4 mx-auto mt-6">
        <div className="flex border-b border-zinc-700 pb-1 items-center ">
            
                {user?.profileImage && (
                    <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-40 h-40 rounded-full p-4"/>
                )}

            <div className="flex flex-col gap-6 ml-4">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p>{user?.bio}</p>
            </div>
        </div>
        <div className="m-2">
            {id === userAuth?._id && (
                <>
                <div ref={newPhotoForm}>
                    <h3>Compartilhe momentos</h3>
                    <form onSubmit={submitHandle}>
                        <label>
                            <span>Titulo para a foto</span>
                            <input type="text" placeholder="Insira um titulo" onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
                        </label>
                        <label>
                            <span>Imagem</span>
                            <input type="file" onChange={handleFile}/>
                        </label>
                        {!loadingPhoto && <input type="submit" value="Postar" />}
                        {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                    </form>
                </div>
                {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
                {messagePhoto && <Message msg={messagePhoto} type="success"></Message>}
                </>
            )}
        </div>
    </div>
    )
}

export default Profile