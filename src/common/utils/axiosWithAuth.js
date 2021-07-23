import axios from 'axios';

export const axiosWithAuth = (baseURL="https://saudi-market-app.herokuapp.com") =>{
    const token = localStorage.getItem("authToken");
    return axios.create({
      baseURL,
      headers: { Authorization: token }
    });
};