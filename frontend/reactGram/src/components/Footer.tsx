import { BiBook, BiCamera, BiHome } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "../store"



const Footer = () => {

  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-black/10 border-t border-zinc-900/30 shadow-sm mt-20">
    <footer className="flex flex-col h-48 gap-6 justify-center items-center">
    <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center gap-1"><span><BiCamera className="text-zinc-100"/></span>ReactGram</p>
      <div className="">
        <ul className="flex gap-10 info-footer">
          <NavLink to='/'>
            <li><p><span><BiHome /></span>Home</p></li>
          </NavLink>
          <NavLink to={`/users/profile/${user?._id}`}>
            <li><p><span><CgProfile /></span>Perfil</p></li>
          </NavLink>
          <NavLink to={`/users/profile/${user?._id}`}>

            <li><p><span><BiBook /></span>Documentação</p></li>
          </NavLink>
          <NavLink to={`/users/profile/${user?._id}`}>
            <li><p><span><BsGithub /></span>Código-fonte</p></li>
          </NavLink>
        </ul>

      </div>
      <div className="flex flex-col text-center text-zinc-400 gap-2 text-xs">
        <p>Este é um projeto simples para estudos de React e Tailwind CSS</p>
        <p>© 2025 ReactGram • Projeto educacional</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer