import { FormEvent, useEffect } from "react"
import FormStyle from "../../components/FormStyle";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { reset } from "../../slices/authSlice";


const EditProfile = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('oi')
    }

    const dispatch: AppDispatch = useDispatch();

    const {loading, error} = useSelector((state: RootState) => state.auth);

  // Clean all auth states
    useEffect(() => {
     dispatch(reset());
    }, [dispatch])


  return (
    <FormStyle
    btnText="Atualizar"
    handleSubmit={handleSubmit}
    title="Edite seus dados"
    subtitle="Acione uma imagem de perfil e fale um pouco mais sobre você..."
    linkText="Não que editar agora?"
    linkTo="/"
    loading={loading}
    errorMessage={error}
          >
            <label>
              <span>Digite seu nome</span>
              <input type="text" placeholder="Nome"/>
            </label>

            <label>
              <span>Digite seu email</span>
              <input type="email" name="" placeholder="E-mail" />
            </label>

            <label>
                <span>Imagem de perfil</span>
                <input type="file" name="" />
             </label>
             
             <label>
                <span>Bio</span>
                <input type="text" placeholder="Descrição do perfil"/>
             </label>
             
             <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" name="" placeholder="Digite sua nova senha" />
             </label>

    </FormStyle>
  )
}

export default EditProfile