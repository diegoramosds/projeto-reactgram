//Components
import Message from "../../components/Message";

//Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../slices/authSlice";
import FormStyle from "../../components/FormStyle";
import { RootState } from "../../store";

//Redux
import type { AppDispatch } from "../../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const user = {
    email,
    password,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(user));
  };
  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <FormStyle
      title="Faça login"
      subtitle="Faça seu login"
      handleSubmit={handleSubmit}
      loading={loading}
      linkTo="/register"
      linkText="Não tem conta?"
      btnText="Entrar"
      errorMessage={error && <Message msg={error} type="error" />}
    >
      <input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email || ""}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password || ""}
      />
    </FormStyle>
  );
};

export default Login;
