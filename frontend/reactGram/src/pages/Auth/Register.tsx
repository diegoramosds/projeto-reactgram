//hooks
import { useState, useEffect } from "react";

//Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Redux
import { register, reset } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";



const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth)

const user = {
  name,
  email,
  password,
  confirmPassword,
}

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)

    dispatch(register(user))
};;

   // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])
  return (
    <div className="bg-zinc-950 w-2/5 mx-auto p-4 my-10 rounded-xl">
      <div className="text-center w-11/12 mx-auto my-0">
        <h1 className="text-2xl font-bold pb-10 pt-8">Faça seu cadastro</h1>
        <p className="text-zinc-400 pb-6">Crie sua conta e comece a capturar e compartilhar momentos inesquecíveis.</p>
        <form onSubmit={handleSubmit} className="border-b border-zinc-700 pb-6">
          <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name}/>
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type="password"  placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <input type="password"  placeholder="Confirme senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
           {!loading && <input type="submit" value="Cadastrar" />}
           {loading && <input type="submit" value="Aguarde" className="bg-sky-700/80" disabled/>}
           {error && <Message msg={error} type="error"/>}
        </form>
        <p className="pt-12 pb-4">Já tem conta? <Link to="/login">Clique aqui</Link></p>
      </div>
    </div>
  )
}

export default Register