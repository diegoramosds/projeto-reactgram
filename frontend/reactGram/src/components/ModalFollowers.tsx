import { Link } from "react-router-dom"
import { uploads } from "../utils/config"
import { BiX } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";

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
        <div  className="fixed  backdrop-blur-sm inset-0 z-10">
            <div className=" w-1/2 min-h-[85%] mx-auto gap-10 mt-10 z-20 bg-zinc-950 rounded-lg flex-wrap text-wrap">
                    <p onClick={closeModal} className="flex justify-end p-5"><BiX size={30}/></p>
                    {data &&  data.map((item : Partial<FollowersProps>) => (
                    <div className="mt-5 border-b border-zinc-900/40 w-3/4 mx-auto p-2" key={item.userId}>
                        <Link to={`/users/profile/${item.userId}`} className="flex items-center  gap-5" onClick={closeModal}>
                        <img src={`${uploads}/users/${item.userImage}`} alt={item.userName} className="w-20 h-20 rounded-full" />
                        <p className="font-medium">{item.userName}</p>
                        </Link>
                    </div>
                ))}
                {data.length === 0 && <p className="flex flex-col items-center text-lg mt-10 justify-center text-center">
                    <span><CgUserList size={100}/></span>{textInfo}</p>}
            </div>
        </div>
)
}

export default ModalFollowers