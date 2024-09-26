import { 
  BsSearch, 
  BsHouseDoorFill, 
  BsFillPersonFill,
  BsFillCameraFill } from "react-icons/bs"

import { Link, NavLink, useNavigate } from "react-router-dom"

//Hooks
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"


const NavBar = () => {
  const {auth} = useAuth();
  const {user} = useSelector((state) => state.auth);

  return (
    <nav className="flex justify-between items-center p-3 border-b border-zinc-800 bg-zinc-950 md:">
      <Link to="/" className="text-zinc-100">ReactGram</Link>
      
      <form className="relative flex items-center">
        <BsSearch className="absolute left-3 top-3 text-zinc-400"/>
        <input type="text" 
        placeholder="Pesquisar" 
        className="pl-10 pr-4 py-2 rounded-md bg-zinc-800 text-zinc-100 border focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent md:pl-10 md:pr-4 md:py-2"/>
        </form>

        <ul className="flex gap-2 items-center text-zinc-100 pr-3 md:gap-6 md:text-lg">

          {auth ? (
            <>
            <li><NavLink to="/"> <BsHouseDoorFill /> </NavLink></li>

            {user && (
              <NavLink to={`/users/${user._id}`}>
                 <BsFillCameraFill />
              </NavLink>
            )}

            <li>
              <NavLink to="/profile">
              <BsFillPersonFill />
              </NavLink>
            </li>

            <li>
              <span>Sair</span>
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
  )
}

export default NavBar