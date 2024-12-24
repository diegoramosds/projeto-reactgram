//hooks
import { useState, useEffect } from "react";

//Components
import Message from "../../components/Message";

//Redux
import { register, reset } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import FormStyle from "../../components/FormStyle";
import { RootState } from "../../store";

import type { AppDispatch } from "../../store";


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch: AppDispatch  = useDispatch();

  const {loading, error} = useSelector((state: RootState) => state.auth)

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
};

   // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])
  return (
    <FormStyle title="Faça seu cadastro"
    subtitle="Crie sua conta e comece a capturar e compartilhar momentos inesquecíveis."
    handleSubmit={handleSubmit}
    loading={loading}
    linkTo="/login"
    linkText="Já tem conta?"
    btnText="Cadastrar"
    errorMessage={error && <Message msg={error} type="error"/>}>
          <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name}/>
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type="password"  placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <input type="password"  placeholder="Confirme senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                  
    </FormStyle>
        
  )

}

export default Register