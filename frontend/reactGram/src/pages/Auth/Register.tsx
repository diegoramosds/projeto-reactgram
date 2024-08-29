import { Link } from "react-router-dom";


const Register = () => {
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('oi')
  }
  return (
    <div>
      <h1 className="">ReactGram</h1>
      <p className="">Crie sua conta e comece a capturar e compartilhar momentos inesquecíveis.</p>
      <form onSubmit={handleSubmit} className="">
        <input type="text" placeholder="Nome" className=""/>
        <input type="email" placeholder="E-mail" />
        <input type="password"  placeholder="Senha"/>
        <input type="password"  placeholder="Confirme senha"/>
        <input type="submit" value="Cadastrar" />
      </form>
      <p>Já tem conta? <Link to="/login">Clique aqui</Link></p>
    </div>
  )
}

export default Register