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
import { delePhoto, getUserPhotos, publishPhoto, resetMessage, updatePhoto } from "../../slices/photoSlice"

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
    } = useSelector((state: RootState) => state.photo)

    const [image, setImage] = useState<File | string>(String);
    const [title, setTitle] = useState("");

    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState<File | string>(String);
    const [editTitle, setEditTitle] = useState("");

    //New form and edit form const const = useRef(second)
    const newPhotoForm =  useRef<HTMLDivElement | null>(null)
    const editPhotoForm = useRef<HTMLDivElement | null>(null)

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
        
    } 
}, [dispatch, id]);

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
          }, 2000)    
    }

    const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     type PhotoDataProps = {
        title: string,
        image: string | File,
     }

     const photoData: PhotoDataProps = {
        title,
        image
     }

     //Build form data
     const formData = new FormData()

    Object.keys(photoData).forEach((key) => 
        formData.append(key, photoData[key as keyof PhotoDataProps])
    );

    dispatch(publishPhoto(formData))
    
    setTitle("")

    resetComponentMessage();
    }

    //Delete a photo
    const handleDelete = (id: string) => {

       dispatch(delePhoto(id))

      resetComponentMessage();
 }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
  
            setImage(image);
      }
    }


    //Show or hide forms 
      const hideOrShowForms = () => {
        newPhotoForm.current?.classList.toggle("hide")
        editPhotoForm.current?.classList.toggle("hide")
      }  

      type EditPhotoProps = {
        _id: string,
        title: string,
        image: string | File,
     }

       //Open Edit form
    const  handleEdit = (photo: EditPhotoProps) => {
        if (editPhotoForm.current?.classList.contains("hide")) {
          hideOrShowForms();  
        }

        setEditId(photo._id)
        setEditImage(photo.image)
        setEditTitle(photo.title) 
      }

    // Cancel editing
        const handleCancelEdit = () => {
        hideOrShowForms();
        };


    //Update photo
    const handleUpdate = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData));
        resetComponentMessage();
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
        <div className="m-4">
            {id === userAuth?._id && (
                <>
                <div ref={newPhotoForm} className="border-b border-zinc-700 mb-8">
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
                        {loadingPhoto && <input type="submit" disabled value="Aguarde..."  />}
                    </form>
                </div>

                <div className="hide" ref={editPhotoForm}>
                    <p>Editando</p>
                    {editImage && (
                        <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                    )}
                    <form onSubmit={handleUpdate}>
                        <input type="text" 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        value={editTitle || ""}/>
                    
                        <input type="submit"  value="Atualizar"  />
                        <button className="" onClick={handleCancelEdit}>Cancelar edição</button>
                    </form>
                </div>
                {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
                {messagePhoto && <Message msg={messagePhoto} type="success"></Message>}
                </>
            )}

            <div className="w-full flex flex-col flex-wrap mt-5">
                <h2 className="font-bold text-xl mb-5">Fotos publicadas</h2>
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {photos && photos.map((photo) => (


                    <div key={photo._id} className="flex flex-col w-36">
                        {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)}
                       
                            {id === userAuth?._id ? (
                               <div className="flex justify-around m-3 cursor-pointer text-lg">
                                <Link to={`/photos/${photo._id}`}><BsFillEyeFill/></Link>
                                <BsPencilFill onClick={() => handleEdit(photo)}/>
                                <BsXLg onClick={() => handleDelete(photo._id)}/>
                               </div>
                                
                            ) : 
                            (
                            <Link to={`/photos/${photo._id}`}>Ver</Link>
                            )}

                    </div>


                    ))}
                    {photos.length === 0 && <p>Ainda não há publicações</p>}
                </div>
            </div>
        </div>
    </div>
    )

}

export default Profile