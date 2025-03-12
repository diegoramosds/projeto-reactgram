import { useEffect } from 'react'
import { uploads } from '../utils/config'
import { BiUserCircle } from 'react-icons/bi'
import { getUserDetails } from '../slices/userSlice'
import { AppDispatch } from '../store'
import { useDispatch } from 'react-redux'

interface UserProps{
profileImage: string
name: string
}

interface PhotoUserProps {
user: UserProps | null
}

const PhotoUser = ({user}: PhotoUserProps) => {

const dispatch: AppDispatch = useDispatch();

return (
    <div className='flex items-center'>
        {user?.profileImage ?  (
                              <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-14 h-14 mx-auto rounded-full p-4 object-cover"/>
                          ) : (
                            <BiUserCircle  className="" size={70}/>
                          )}
    </div>
  )
}

export default PhotoUser