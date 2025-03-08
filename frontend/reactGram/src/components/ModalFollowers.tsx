import { Link, useParams } from "react-router-dom"
import { uploads } from "../utils/config"
import { BiUserCheck, BiUserPlus, BiX } from "react-icons/bi";
import { CgArrowLeft, CgUserList } from "react-icons/cg";

interface FollowersProps {
    userId?: string;
    userName?: string;
    userImage?: string;
    bio?: string;
}
interface User {
    _id: string;
    followers: Partial<FollowersProps>[];
    following: Partial<FollowersProps>[];
}

interface UserAuth {
    _id: string;
}
interface ModalProps {
    user: User | null;
    userAuth: UserAuth | null;
    closeModal: () => void ;
    handleFollowing: () => void;
    textModal: string;
    textInfo: string;
    dataType: "followers" | "following";
}

const ModalFollowers = ({user, userAuth, closeModal, handleFollowing, textModal, textInfo, dataType}: ModalProps) => {

const {id} = useParams();

const data = user? user[dataType]: [];

return (

        <div  className="fixed  backdrop-blur-sm inset-0 z-10">
            <div className=" w-4/12 min-h-[70%] mx-auto gap-10 mt-20 z-20 bg-zinc-900 rounded-2xl flex-wrap text-wrap">
                    <div className="flex bg-zinc-800 p-3 rounded-t-2xl items-center justify-between">
                        <p onClick={closeModal} className="flex items-center justify-center text-sm w-20 gap-1 m-3 rounded-full text-zinc-300/80 hover:bg-zinc-900"><CgArrowLeft size={18}/>Voltar</p>
                        <p onClick={closeModal} className="text-lg font-medium">{textModal}</p>
                        <p onClick={closeModal} className=""><BiX size={20}/></p>
                    </div>
                    {data &&  data.map((item : Partial<FollowersProps>) => (
                    <div className="flex items-center mt-5 border-t border-zinc-800 rounded-2xl px-2 transition-all
                        duration-200 w-3/4 mx-auto p-2 hover:bg-zinc-950/20" key={item.userId}>
                        <Link to={`/users/profile/${item.userId}`} className="flex items-center gap-3" onClick={closeModal}></Link>
                        <div className="flex items-center gap-3 first:border-transparent">
                        <img src={`${uploads}/users/${item.userImage}`} alt={item.userName} className="w-10 h-10 rounded-full" />
                            <p className="font-medium">{item.userName}</p>
                            <p className="font-medium">{item.bio}</p>
                        </div>
                        <div className="ml-5">
                            {user && userAuth?._id !== id && item.userId !== userAuth?._id  ? (
                                              Array.isArray(user?.followers) && user?.followers.some((follower) => follower.userId?.includes(userAuth?._id as string))?
                                              <p className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-300
                                          rounded-full p-1 px-3" onClick={handleFollowing}><span>
                                                <BiUserCheck size={20}/></span>Seguindo</p>
                                                : <p className="flex items-center gap-1 border bg-zinc-100 hover:bg-zinc-300 cursor-pointer text-zinc-900
                                          rounded-full p-1 px-3" onClick={handleFollowing}><span>
                                                <BiUserPlus size={20}/></span>Seguir</p>
                                            ) : ""}
                        </div>
                        
                    </div>
                ))}
                {data.length === 0 && <p className="flex flex-col items-center text-lg mt-10 justify-center text-center">
                    <span><CgUserList size={100}/></span>{textInfo}</p>}
            </div>
        </div>
)
}

export default ModalFollowers