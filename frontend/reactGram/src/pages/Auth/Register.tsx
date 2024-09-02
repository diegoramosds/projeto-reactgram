import { Link } from "react-router-dom";


const Register = () => {
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('oi')
  }
  return (
    <div className="bg-zinc-950 w-2/5 mx-auto p-4 my-10 rounded-xl">
      <div className="text-center w-11/12 mx-auto my-0">
        <h1 className="text-2xl font-bold pb-10 pt-8">Faça seu cadastro</h1>
        <p className="text-zinc-400 pb-6">Crie sua conta e comece a capturar e compartilhar momentos inesquecíveis.</p>
        <form onSubmit={handleSubmit} className="border-b border-zinc-700 pb-6">
          <input type="text" placeholder="Nome" className=""/>
          <input type="email" placeholder="E-mail" />
          <input type="password"  placeholder="Senha"/>
          <input type="password"  placeholder="Confirme senha"/>
          <input type="submit" value="Cadastrar" />
        </form>
        <p className="pt-12 pb-4">Já tem conta? <Link to="/login" className="text-sky-700">Clique aqui</Link></p>
      </div>
    </div>
  )
}

export default Register