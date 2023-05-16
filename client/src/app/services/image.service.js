import axios from '../../apis/imageinServer'

export const generateImage = async () => {
    try{
        const response = await axios.get("/images/generate/text2img");
        return response;
      }catch(e){
        return e;
    }
}

// Paginate and get general images.
export const getImages = () => {

}

// Paginate and get User private images.
export const getUserImages = () => {

}