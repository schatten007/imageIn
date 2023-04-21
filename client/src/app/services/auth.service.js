import axios from '../../apis/imageinServer'


const register = (username, email, password) => {
  return axios.post("/user/register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post("/user/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
