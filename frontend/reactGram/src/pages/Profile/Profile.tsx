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

const Profile = () => {
    

    const {id} = useParams()


    const dispatch: AppDispatch = useDispatch()

    const {user, loading} = useSelector((state: RootState) => state.user)
    const {user: userAuth} = useSelector((state: RootState) => state.auth)

    //New form and edit form const const = useRef(second)
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    //Load user data
    useEffect(() => {
    if (id) {
        dispatch(getUserDetails(id));
    } else {
        console.error("ID do usuário é undefined");
    }
}, [dispatch, id]);

    const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
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
                            <input type="text" placeholder="Insira um titulo"/>
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="file" />
                        </label>
                        <input type="button" value="Postar" />
                    </form>
                </div>
                </>
            )}
        </div>
    </div>
    )
}

export default Profile