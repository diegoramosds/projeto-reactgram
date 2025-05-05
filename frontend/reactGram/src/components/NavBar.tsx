import { BsSearch, BsFillPersonFill, BsX } from "react-icons/bs";
import { HiEllipsisHorizontal, HiUserGroup } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { logout, reset } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { DiAptana } from "react-icons/di";
import { BiCamera, BiHome, BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import PhotoUser from "./PhotoUser";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setModal(false);
    navigate("/login");
  };

  const [localStorageUser, setLocalStorageUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    if (user) {
      setLocalStorageUser(user);
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUserString = localStorage.getItem("user") || "{}";
      const updatedUser = JSON.parse(updatedUserString);

      if (JSON.stringify(updatedUser) !== JSON.stringify(localStorageUser)) {
        setLocalStorageUser(updatedUser);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [localStorageUser]);

  // Search
  const handleSearh = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    if (search) {
      return navigate(`/search?q=${search}`);
    }
  };

  // Modal
  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [dispatch, modal]);

  // Close modal
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <nav className="flex fixed z-10 w-full justify-between items-center p-3 bg-black border-b border-zinc-900/20 shadow-sm md:justify-around md:gap-32">
        <Link to="/" className="text-zinc-100 text-lg font-medium md:text-xl">
          ReactGram
        </Link>
        {window.innerWidth > 650 && (
          <form
            className="relative flex items-center justify-center "
            onSubmit={handleSearh}
          >
            <BsSearch className="absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-2 py-2 rounded-xl bg-zinc-900 text-zinc-200 border focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent md:pl-10 md:pr-16 md:py-2"
            />
          </form>
        )}
        <ul className="flex items-center text-zinc-100 pr-3 md:gap-3 md:text-xl nav-icons">
          {auth ? (
            <>
              <li>
                <NavLink to="/" aria-label="Página inicial">
                  <BiHome />
                </NavLink>
              </li>
              {window.innerWidth < 650 && (
                <li>
                  <NavLink to="/search" aria-label="Pesquisar">
                    <BsSearch />
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    to={`/users/${user._id}`}
                    aria-label="Perfil de usuário"
                  >
                    <BiCamera />
                  </NavLink>
                </li>
              )}
              <li>
                <HiEllipsisHorizontal
                  onClick={handleModal}
                  aria-label="Abrir menu de opções"
                />
              </li>
              {user && (
                <li>
                  <Link
                    to={`users/profile/${user._id}`}
                    aria-label="Ver perfil do usuário"
                  >
                    <PhotoUser
                      user={localStorageUser}
                      sizeImage="30px"
                      sizeIcon="24px"
                    />
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              <div className="flex gap-3">
                <li>
                  <NavLink to="/login" aria-label="Entrar">
                    Entrar
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" aria-label="Cadastrar">
                    Cadastrar
                  </NavLink>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
      <div className="h-24"></div>
      {user && modal && (
        <div className="fixed inset-0 z-10 backdrop-blur-sm overflow-y-auto">
          <ul className="w-5/6 relative mt-20 mx-auto z-20 p-4 gap-8 bg-zinc-900 rounded-xl modal animate-toTop md:w-1/4">
            <div className="flex justify-between text-xl p-2 pb-5">
              <h1>Opções</h1>
              <p className="hover:bg-zinc-800 rounded-full modal">
                <BsX size={26} onClick={() => closeModal()} />
              </p>
            </div>
            <div>
              <li>
                <NavLink
                  to={`/users/profile/${user._id}`}
                  onClick={() => closeModal()}
                  aria-label="Ver perfil de usuário"
                >
                  <p>
                    <span>
                      <BsFillPersonFill />
                    </span>
                    Perfil
                  </p>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/photos/find"}
                  onClick={() => closeModal()}
                  aria-label="Curtidas e comentários"
                >
                  <p>
                    <span>
                      <BiMessageSquareAdd />
                    </span>
                    Curtidas e Comentários
                  </p>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  onClick={() => closeModal()}
                  aria-label="Configurações e privacidade"
                >
                  <p>
                    <span>
                      <DiAptana />
                    </span>
                    Configuração e privacidade
                  </p>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/search"
                  onClick={() => closeModal()}
                  aria-label="Buscar usuários e publicações"
                >
                  <p>
                    <span>
                      <HiUserGroup />
                    </span>
                    Encontre usuários e/ou publicações
                  </p>
                </NavLink>
              </li>

              <li onClick={handleLogout} aria-label="Sair">
                <p className="text-red-500">
                  <span>
                    <FiLogOut />
                  </span>
                  Sair
                </p>
              </li>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
