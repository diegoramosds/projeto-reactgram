import { 
  BsSearch, 
  BsHouseDoorFill, 
  BsFillPersonFill,
  BsFillCameraFill } from "react-icons/bs"

import { Link, NavLink } from "react-router-dom"


const NavBar = () => {
  return (
    <nav className="flex justify-between p-5 border-b border-zinc-800 bg-zinc-950">
      <Link to="/">ReactGram</Link>
      
      <form className="flex items-center gap-1">
        <BsSearch />
        <input type="text" placeholder="Pesquisar"/>
        </form>

        <ul className="flex gap-6 items-center">
          <li>
            <NavLink to="/"> <BsHouseDoorFill /> </NavLink>
          </li>

          <li>
            <NavLink to="/login"> Entrar </NavLink>
          </li>

          <li>
            <NavLink to="/register"> Cadastrar </NavLink>
          </li>
          
        </ul>
      
    </nav>
  )
}

export default NavBar