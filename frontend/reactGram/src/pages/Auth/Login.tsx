//Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"


//Hooks 
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../../slices/authSlice"

//Redux


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth)

  const user = {
    email,
    password,
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)

    dispatch(login(user))
};
  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <div className="bg-zinc-950 w-2/5 mx-auto p-4 my-10 rounded-xl">
      <div className="text-center w-11/12 mx-auto my-0">
        <h1 className="text-2xl font-bold pb-10 pt-8">Faça seu cadastro</h1>
        <p className="text-zinc-400 pb-6">Faça seu login.</p>
        <form onSubmit={handleSubmit} className="border-b border-zinc-700 pb-6">
  
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
          <input type="password"  placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
    
           {!loading && <input type="submit" value="Entrar" />}
           {loading && <input type="submit" value="Aguarde" disabled/>}
          {error && <Message msg={error} type="error"/>}

        </form>
        <p className="pt-12 pb-4">Não tem conta? <Link to="/register" className="text-sky-700 border-b border-sky-700 hover:text-sky-700/80">Clique aqui</Link></p>
      </div>
    </div>
  )
}

export default Login