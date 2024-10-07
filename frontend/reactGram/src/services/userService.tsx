import { api, requestConfig } from "../utils/config";

 const profile = async(data: unknown, token: string) => {

    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/profile", config)
        .then((res) => res.json())
        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }    
 }
 
 const update = async(data: FormData, token: string) => {

    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/users/", config)
        .then((res) => res.json())
        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)   
    }
 }

 //Get user details
const getUserDetails = async(id: void) => {

    const config = requestConfig("GET")

    try { 
        const res = await fetch(api + "/users/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res
    } catch (error) {
        console.log(error)
    }
}

 const userService = {
    profile,
    update,
    getUserDetails
 }
 
 export default userService;
