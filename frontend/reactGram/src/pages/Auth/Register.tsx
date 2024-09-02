import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const user = {
  name,
  email,
  password,
  confirmPassword,
}

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)
}
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
          <input type="submit" value="Cadastrar" />
        </form>
        <p className="pt-12 pb-4">Já tem conta? <Link to="/login" className="text-sky-700">Clique aqui</Link></p>
      </div>
    </div>
  )
}

export default Register