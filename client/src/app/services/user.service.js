import axios from '../../apis/imageinServer'

export const getUserImages = () => {

}

export const getUserProfile = async () => {
    try{
      const response = await axios.get("/user/me");
      return response;
    }catch(e){
      return e;
    }
}