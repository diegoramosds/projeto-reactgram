import { uploads } from '../utils/config'
import { BiUserCircle } from 'react-icons/bi'
interface UserProps{
profileImage: string
name: string
}

interface PhotoUserProps {
user: UserProps | null;
sizeImage: string;
sizeIcon: string;
}

const PhotoUser = ({user, sizeImage, sizeIcon}: PhotoUserProps) => {

return (
    <div className='flex items-center'>
        {user?.profileImage ?  (
                              <img src={`${uploads}/users/${user?.profileImage}`} alt={user.name} style={{width: sizeImage, height: sizeImage}}  className="mx-auto rounded-full p-4 object-cover"/>
                          ) : (
                            <BiUserCircle  size={sizeIcon}/>
                          )}
    </div>
  )
}

export default PhotoUser