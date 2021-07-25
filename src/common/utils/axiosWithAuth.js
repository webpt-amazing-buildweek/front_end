import axios from 'axios';

export const axiosWithAuth = (baseURL="https://sauti-market-bw.herokuapp.com") =>{
    const token = localStorage.getItem("authToken");
    return axios.create({
      baseURL,
      headers: { Authorization: token }
    });
};