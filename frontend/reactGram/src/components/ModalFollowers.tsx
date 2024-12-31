import { Link } from "react-router-dom"
import { uploads } from "../utils/config"

interface FollowersProps {
    userId?: string;
    userName?: string;
    userImage?: string;
}
interface User {
    followers: Partial<FollowersProps>[];
    following: Partial<FollowersProps>[];
}
interface ModalProps {
    user: User | null;
    closeModal: () => void ;
    textInfo: string;
    dataType: "followers" | "following";
}

const ModalFollowers = ({user, closeModal, textInfo, dataType}: ModalProps) => {

const data = user? user[dataType]: [];

return (
        <div  className="fixed  bg-black/70 inset-0 z-10">
            <div className=" w-1/2 h-full mx-auto gap-10 mt-10 z-20 bg-zinc-950">
                    <p onClick={closeModal} className="flex justify-end p-5">X</p>
                    {data &&  data.map((item : Partial<FollowersProps>) => (
                    <div className="mt-10 border-b border-zinc-900 w-3/4 mx-auto p-2" key={item.userId}>
                        <Link to={`/users/profile/${item.userId}`} className="flex items-center  gap-20" onClick={closeModal}>
                        <img src={`${uploads}/users/${item.userImage}`} alt={item.userName} className="h-16 rounded-full" />
                        <p>{item.userName}</p>
                        </Link>
                    </div>
                ))}
                {data.length === 0 && <p className="text-center">{textInfo}</p>}
            </div>
        </div>
)
}

export default ModalFollowers