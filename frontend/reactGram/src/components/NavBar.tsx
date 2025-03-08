import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill, 
  BsX} from "react-icons/bs"
import { HiEllipsisVertical, HiUserGroup } from "react-icons/hi2";

import { Link, NavLink, useNavigate } from "react-router-dom"

//Hooks
import { useAuth } from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"

//Redux
import { logout, reset } from "../slices/authSlice"
import { AppDispatch, RootState } from "../store"
import { useEffect, useState } from "react"
import { DiAptana } from "react-icons/di";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const {auth} = useAuth();
  const {user} = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState("");


  const [modal, setModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset());
    setModal(false)
    navigate("/login")
    }

    // Search
    const handleSearh = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("")
    if(search) {
    return navigate(`/search?q=${search}`)
    }
  }

    // modal
    const handleModal = () => {
      setModal(!modal)
    }

    useEffect(() => {
      if (modal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      return () => document.body.classList.remove("overflow-hidden");
    }, [modal]);

    // close modal
    const closeModal = () => {
      setModal(false);
    }
  return (
    <>
    <nav className="flex  w-full justify-around gap-32 items-center p-3 bg-zinc-950 border-b border-zinc-900/30">
      <Link to="/" className="text-zinc-100 text-xl font-medium">ReactGram</Link>
      <form className="relative flex items-center justify-center" onSubmit={handleSearh}>
        <BsSearch className="absolute left-3 top-3 text-zinc-500"/>
        <input type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-xl bg-zinc-900 text-zinc-200 border focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent md:pl-10 md:pr-16 md:py-2"/>
        </form>
        <ul className="flex gap-2 items-center text-zinc-100 pr-3 md:gap-7 md:text-xl">
          {auth ? (
            <>
            <li><NavLink to="/"> <BsHouseDoorFill /> </NavLink></li>
            {user && (
              <NavLink to={`/users/${user._id}`}>
                <BsFillCameraFill />
              </NavLink>
            )}
            <li>
            <HiEllipsisVertical  onClick={handleModal}/>
            </li>
            </>
          )
          : (
            <>
          <li><NavLink to="/login"> Entrar </NavLink> </li>
          <li> <NavLink to="/register"> Cadastrar </NavLink></li>
          </>
          )
          }
        </ul>
    </nav>
    {user && modal && (
            <div className="fixed inset-0 z-10 backdrop-blur-sm">
              <ul className="w-1/4 mt-20 mx-auto z-20 p-4 gap-8 bg-zinc-900 rounded-xl modal animate-toTop">
                <div className="flex justify-between text-xl p-2 pb-5">
                  <h1>Opções</h1>
                  <p className="hover:bg-zinc-800 rounded-full modal">
                    <BsX size={26} onClick={() => closeModal()}/>
                  </p>
                </div>
                <div>
                <NavLink to={`/users/profile/${user._id}`} onClick={() => closeModal()}>
                    <li> 
                    <p >
                    <span><BsFillPersonFill /></span>Perfil
                    </p>
                    </li>
                </NavLink>

                  <NavLink to={"/photos/find"} onClick={() => closeModal()}>
                  <li>
                      <p><span><BiMessageSquareAdd/> </span>Curtidas e Comentários</p>
                  </li>
                  </NavLink>

                  <NavLink to="/settings" onClick={() => closeModal()}>
                    <li>
                        <p><span><DiAptana /></span>Configuração e privacidade</p>
                    </li>
                  </NavLink>

                  <NavLink to="/search" onClick={() => closeModal()}>
                  <li>
                      <p><span><HiUserGroup /></span>Encontre usuários e/ou publicações</p> 
                  </li>
                  </NavLink>

                  <li onClick={handleLogout}><p className="text-red-500"><span><FiLogOut /></span>Sair</p></li>
              </div>
              </ul>
              </div>
              )}
    </>
  )
}

export default NavBar