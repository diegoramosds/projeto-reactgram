import { uploads } from '../utils/config'
import { BiUserCircle } from 'react-icons/bi'

interface UserProps{
profileImage: string
name: string
}

interface PhotoUserProps {
user: UserProps | null
}

const PhotoUser = ({user}: PhotoUserProps) => {
 return (
    <div className='flex items-center'>
        {user?.profileImage ? (
                              <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name}  className="w-32 h-32 mx-auto rounded-full p-4 object-cover"/>
                          ) : (
                            <BiUserCircle  className="" size={70}/>
                          )}
    </div>
  )
}

export default PhotoUser