import { api, requestConfig } from "../utils/config";

const publishPhoto = async(data: object, token: string) => {
    
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
const deletePhoto = async(id: string, token: string ) => {

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
const updatePhoto = async(data: object, id: string, token: string) => {

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

//Get photo by id 
const getPhotoById = async(id: string | undefined, token: string) => {

 const config = requestConfig("GET", null, token)   

  try {
    const res = await fetch(api + "/photos/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)

    return res

  } catch (error) {
    console.log(error)
    
  }
}

// Like a photo
const likePhoto = async (id: string, token: string) => {
    const config = requestConfig("PUT", null, token);
  
    try {
      const res = await fetch(api + "/photos/like/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
        
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // Add Comments to a photo
  const comments = async(data: object, id: string, token: string) => {
     const config = requestConfig("PUT", data, token);

     try {
      const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

      return res;
    } catch (error) {
      console.log(error)
    }
  }

  //Remove comment
  const removeComments = async(photoId: string, id: string, token: string) => {

    const config = requestConfig("DELETE", null, token);
    try {
    const res = await fetch(api + `/photos/remove/comment/${photoId}/`  + id, config)
    .then((res) => res.json())
    .catch((err) => err)

    return res;
    } catch (error) {
      console.log(error)
    }
  }

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    likePhoto,
    comments,
    removeComments
}

export default  photoService;