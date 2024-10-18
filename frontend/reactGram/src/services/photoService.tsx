import { api, requestConfig } from "../utils/config";

const publishPhoto = async(data: string, token: string) => {
    
    const config = requestConfig("POST" , data, token, true)

    try {
        const res = await fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)
    }
    
}

//Get user photos
const getUserPhotos = async(id: string, token: string) => {

    const config = requestConfig("GET", null, token)


    try {
    const res = await fetch(api + "/photos/user/" + id, config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
        
    } catch (error) {
       console.log(error) 
    }
}

//Delete a photo
const deletePhoto = async(id: string, token: string | null | undefined ) => {

     const config = requestConfig("DELETE", null, token)

     try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res

     } catch (error) {
        console.log(error)
     }
}

//update photo
const updatePhoto = async(data: object, id: string, token: string | null | undefined) => {

    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/photos/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
        
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto
}

export default  photoService;