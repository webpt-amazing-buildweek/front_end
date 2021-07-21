import axios from 'axios';

export const axiosWithAuth = () =>{
    const token = localStorage.getItem("authToken");
    return axios.create({
      baseURL: "https://team-amazing.herokuapp.com/api",
      headers: { Authorization: token }
    });
};