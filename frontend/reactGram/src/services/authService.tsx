
import { api, requestConfig } from "../utils/config";

//Register an user
const register = async(data: unknown) => {
    
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
        .then((res) => res.json())
        .catch((err) => err)

        if(res) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res;
        
    } catch (error) {
        console.log(error)
    }
}
const logout = () => {
    localStorage.removeItem("user")
}

const login = async(data: unknown) => {
    
    const config = requestConfig("POST", data);  // Configuração da requisição com método POST e dados

    try {
        const res = await fetch(api + "/users/login", config)  // Faz a requisição para a API de login
        .then((res) => res.json())  // Transforma a resposta em JSON
        .catch((err) => err);  // Captura erros de transformação de JSON

        if (res._id) {
            localStorage.setItem("user", JSON.stringify({ token: res.token, id: res._id }));
            // Redirecionar o usuário após o login bem-sucedido

          }
          
        return res;  // Retorna a resposta para uso posterior
        
    } catch (error) {
        console.log(error);  // Captura erros de execução do fetch
    }
};


const authService = {
    register,
    logout,
    login
}

export default authService;