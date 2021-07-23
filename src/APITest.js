import React, {useEffect} from "react";
import { axiosWithAuth } from "./common/utils/axiosWithAuth";
import axios from 'axios';
const baseURL = "http://localhost:5000";
const APITest = ()=>{
    useEffect(()=>{
        localStorage.setItem("authToken","esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ");
    
        const dummyUser = {
          username:"lambda",
          password:"school",
          email: "cool@cmail.com",
          isOwner:true
        };
        axios.post("http://localhost:5000/api/auth/register",dummyUser)
        .then((res)=>{
          console.log("register",res)
        })
        .catch((err)=>{
          console.log({err});
        });
    
    
        axios.post("http://localhost:5000/api/auth/login",dummyUser)
        .then((res)=>{
          console.log("login",res);
          localStorage.setItem("authToken",res.data.token);
        })
        .catch((err)=>{
          console.log({err});
        });
    
    
        axiosWithAuth(baseURL).delete("/api/items/2")
        .then((res)=>{
          console.log("delete item 2",res)
        })
        .catch((err)=>{
          console.log({err});
        });
    
    
    
        axiosWithAuth(baseURL).post("/api/items",{
          id:5,
          item_name:"something 5",
          location:"somewhere 5",
          quantity:5,
          price:5,
          description:"some text 5",
          user_id:5
        },)
        .then((res)=>{
          console.log("post new item",res)
        })
        .catch((err)=>{
          console.log({err});
        });
    
        axiosWithAuth(baseURL).get("/api/items")
        .then((res)=>{
          console.log("get items",res)
        })
        .catch((err)=>{
          console.log({err});
        });
    
    
        axiosWithAuth(baseURL).get("/api/items/1")
        .then((res)=>{
          console.log("get item 1",res)
        })
        .catch((err)=>{
          console.log({err});
        });
    
    
        axiosWithAuth(baseURL).put("/api/items/1",{
          id:1,
          item_name:"something 1 mod",
          location:"somewhere 1 mod",
          quantity:1,
          price:1,
          description:"some text 1 mod",
          user_id:1
        })
        .then((res)=>{
          console.log("put item 1",res)
        })
        .catch((err)=>{
          console.log({err});
        });
      },[])
  return <div></div>;
}

export default APITest;