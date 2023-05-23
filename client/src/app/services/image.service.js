import axios from '../../apis/imageinServer'

export const generateImage = async (body) => {
    try{
        const response = await axios.post("/images/generate/text2img", body);
        return response;
      }catch(e){
        return e;
    }
}

// Paginate and get general images.
export const getImages = () => {

}

// Paginate and get User private images.
export const getUserImages = async (page, limit) => {
  try{
    const response = await axios.get("/images/user", {
      params: {
        page,
        limit
      }
    });
    return response;
  }catch(e){
    return e;
  }
}