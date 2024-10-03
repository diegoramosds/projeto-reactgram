import { FormEvent, useEffect, useState } from "react"
import FormStyle from "../../components/FormStyle";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import Message from "../../components/Message";

const EditProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const [profileImage, setimageProfile] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const {loading, error, user, message, success} = useSelector((state: RootState) => state.user);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      //Gather user data from states
      type UserData = {
        name: string;
        profileImage?: string | File; // Propriedade opcional
        bio?: string; // Propriedade opcional
        password?: string; // Propriedade opcional
      };
      
      const userData: UserData = {
        name
      }

      if(profileImage) {
        userData.profileImage = profileImage;
      }
      if(bio) {
        userData.bio = bio;
      }
      if(password) {
        userData.password = password;
      }

      //build form data
      const formData = new FormData()
      Object.keys(userData).forEach((key) => {
        const value = userData[key as keyof UserData]; // Garante que 'key' seja uma chave válida
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      await dispatch(updateProfile(formData))

      setTimeout(() => {
        dispatch(resetMessage())
      }, 2000)
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const image = e.target.files[0];

     setPreviewImage(image)

     setimageProfile(image)
    }
  }

    const dispatch: AppDispatch = useDispatch();

  //Load user data
    useEffect(() => {
     dispatch(profile());
    }, [dispatch])



  // Fill form with user data
      useEffect(() => {
        if(user) {
          setName(user.name)
          setEmail(user.email)
          setBio(user.bio)
        } 
       }, [user])

  return (
    <FormStyle
    btnText="Atualizar"
    handleSubmit={handleSubmit}
    title="Edite seus dados"
    subtitle="Adicione uma imagem de perfil e fale um pouco mais sobre você..."
    linkText="Não que editar agora?"
    linkTo="/"
    loading={loading}
    errorMessage={error && <Message msg={error} type="error" />}
    successMessage={success && <Message msg={message} type="success" />}
          >
            {(user && (user.profileImage || previewImage)) && (
              
              <img src={previewImage  
                ? URL.createObjectURL(previewImage)
                : `${uploads}/users/${user.profileImage}`
              } 
                alt={user ? user.name : 'User profile'} className="w-40 h-40 rounded-[100%] m-auto mb-10"/>
            )}

            <label>
              <span>Digite seu nome</span>
              <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
            </label>

            <label>
              <span>Digite seu email</span>
              <input type="email" name="" placeholder="E-mail" disabled onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
            </label>

            <label>
                <span>Imagem de perfil</span>
                <input type="file" onChange={handleFile}/>
             </label>
             
             <label>
                <span>Bio</span>
                <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
             </label>
             
             <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" name="" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
             </label>

    </FormStyle>
  )
}

export default EditProfile