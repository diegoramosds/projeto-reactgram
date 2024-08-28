import { 
  BsSearch, 
  BsHouseDoorFill, 
  BsFillPersonFill,
  BsFillCameraFill } from "react-icons/bs"

import { Link, NavLink } from "react-router-dom"


const NavBar = () => {
  return (
    <nav>
      <Link to="/">ReactGram</Link>
      <form>
        <BsSearch />
        <input type="text" />
        <ul>
          <NavLink to="/"> <BsHouseDoorFill /> </NavLink>

          <NavLink to="/login"> <BsHouseDoorFill />Entrar </NavLink>

          <NavLink to="/register"> <BsHouseDoorFill />Cadastrar </NavLink>
          
        </ul>
      </form>
    </nav>
  )
}

export default NavBar