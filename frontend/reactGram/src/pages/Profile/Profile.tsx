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

    //Photo

    //Load user data
    useEffect(() => {

        dispatch(getUserDetails(id))
    }, [dispatch, id])

    if(loading) {
        return <p>Carregando...</p>
    }

    return (
    <div>
        <div>
            {user?.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
            )}
            <div>
                <h2>{user?.name}</h2>
                <p>{user?.bio}</p>
            </div>
        </div>
    </div>
    )
}

export default Profile