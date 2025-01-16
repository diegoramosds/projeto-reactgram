import { api, requestConfig } from '../utils/config';

 const profile = async(data: unknown, token: string) => {

    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/settings", config)
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
const getUserDetails = async(id:string) => {


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

// Search user
const searchUser = async(searchData: string | null, token: string) => {
    const config = requestConfig("GET", null, token)
    
    try {
        const res = await fetch(api + "/users/search?q=" + searchData, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}

// Starting follower
const followingUser = async(id: string, token: string) => {
    const config = requestConfig("PUT", null, token)

    try {
        const res = await fetch(api + "/users/followers/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    profile,
    update,
    getUserDetails,
    searchUser,
    followingUser,
}

export default userService;
