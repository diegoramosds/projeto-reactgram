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
import { delePhoto, getUserPhotos, publishPhoto, resetMessage, updatePhoto } from '../../slices/photoSlice';

const Settings = () => {
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

    const [deletePhotoModal, setDeletePhotoModal] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //New form and edit form const const = useRef(second)
    const newPhotoForm =  useRef<HTMLDivElement | null>(null)
    const editPhotoForm = useRef<HTMLDivElement | null>(null)

    //Load user data
    useEffect(() => {
    if (userAuth?._id) {
        dispatch(getUserDetails(userAuth?._id));
        dispatch(getUserPhotos(userAuth?._id));
    }
}, [dispatch, userAuth]);

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    useEffect(() => {
        if(deletePhotoModal) {
          document.body.classList.add("overflow-hidden")
        } else {
          document.body.classList.remove("overflow-auto")
        }
        return () => document.body.classList.remove("overflow-hidden");
      })

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

    setDeletePhotoModal(false);


    resetComponentMessage();
}

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
  
            setImage(image);
            setSelectedFile(image);
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

    const handleOpenModalDeletePhoto = () => {
        setDeletePhotoModal(true)
}
    const handleCloseModalDeletePhoto = () => {
        setDeletePhotoModal(false)
}

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
    <div className="w-2/4 mx-auto mt-6">
           <div className="flex flex-col items-center gap-3">
                {user?.profileImage && (
                    <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-32 h-32 rounded-full p-4"/>
                )}
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="bg-slate-100 py-1 px-5 rounded-2xl hover:bg-slate-200"><Link to={`/users/profile/${id}`} className="text-black text-sm">Ver perfil</Link> </p>
            </div>
        <div className="m-4">
            {id === userAuth?._id && (
                <>
                <div ref={newPhotoForm} className="mb-16">
                    <h3>Compartilhe momentos</h3>
                    <form onSubmit={submitHandle}>
                        <label>
                            <input type="text" placeholder="Insira um titulo" className="rounded-xl p-3 focus:ring-2 focus:ring-zinc-700" onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
                        </label>
                        <label className="mt-4 relative rounded-lg border border-dashed border-zinc-900 hover:border-zinc-600 transition-colors duration-200">
                            <input type="file" className="absolute inset-0 opacity-0 w-full h-full" onChange={handleFile}/>
                            <div className="p-8 text-center">
                                <p className="">
                                {selectedFile ? selectedFile.name : "Escolher Arquivo"}
                                </p>
                                <p className="text-sm mt-2">
                                {!selectedFile && "Nenhum arquivo escolhido"}
                                </p>
                            </div>
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
            <div className="">
                <h2 className="font-bold text-xl mb-10">Fotos publicadas</h2>
                <h4 className=""></h4>
                <div className="flex gap-8 flex-wrap w-full h-full">
                    {photos && photos.map((photo) => (
                        <div key={photo._id} className="relative group w-1/3">
                            {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="aspect-square rounded-xl overflow-hidden
                    bg-secondary/50 transition-all duration-300 transform group-hover:scale-[1.02]0"/>)}
                                {id === userAuth?._id ? (
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center gap-4 rounded-xl">

                                        <div className="photo-actions flex gap-6">
                                            <p>
                                                <Link to={`/photos/${photo._id}`}><BsFillEyeFill/></Link>
                                            </p>
                                            <p>
                                                <BsPencilFill onClick={() => handleEdit(photo)}/>
                                            </p>
                                            <p>
                                                <BsXLg onClick={handleOpenModalDeletePhoto}/>
                                            </p>
                                        </div>

                                        {deletePhotoModal && (
                                        <div className="fixed inset-0 bg-black/40 z-10">
                                        <div className="w-5/12 h-1/5 mx-auto mt-20 z-20 bg-zinc-900 flex justify-center items-center flex-col rounded">
                                        <h1>Tem certeza que deseja remover essa publicação</h1>
                                            <div className="flex gap-10 mt-5">
                                                <p className="bg-red-600 rounded px-5 hover:bg-red-700"
                                                onClick={() => {
                                                    handleDelete(photo._id)
                                                }}
                                                >Sim
                                                </p>
                                                <p className="bg-sky-700 rounded px-5 hover:bg-sky-800"
                                                onClick={handleCloseModalDeletePhoto}
                                                >Não
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                ) :
                                (
                                <Link to={`/photos/${photo._id}`}>Ver</Link>
                                )}
                        </div>
                        ))}
                </div>
                    {photos.length === 0 && <p>Ainda não há publicações</p>}
                
            </div>
        </div>
    </div>
    )
}

export default Settings