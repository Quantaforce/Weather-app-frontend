import { useNavigate } from "react-router-dom";
import { RefreshToken} from "@/utils/refreshToken";
import { useContext } from "react";
import AuthContext from "@/context/AuthProvider";

const orignalRequest=(url,config)=>{
  return fetch(url,{headers:config});
}
const useCustomFetch=()=>{ 
  const navigate=useNavigate();
  const {setUser}=useContext(AuthContext);
  return async(url)=>{
  //return orignalRequest(url,config);
  let accessToken=localStorage.getItem('accessToken');
  const baseUrl= import.meta.env.VITE_BASEURL;
  const headers={
      'Content-Type': 'application/json',  
      'Authorization': `Bearer ${accessToken}`
  }

  let response=await orignalRequest(baseUrl+url,headers);
  if(response.status==401){
    const tokenRes= await RefreshToken();
    if(tokenRes.status==402){
      setUser(null);
      localStorage.removeItem('accessToken')
      navigate('/login')
    }
    const newtoken=await tokenRes.json();
    localStorage.setItem('accessToken',newtoken.accessToken);
    headers['Authorization']= `Bearer ${newtoken.accessToken}`;
    const newres=await orignalRequest(baseUrl+url,headers);
    return newres;
  }

  return response;
}
}

export default useCustomFetch;
