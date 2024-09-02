import React,{useEffect,useContext} from "react";
import {useNavigate } from "react-router-dom";
import  AuthContext from "../context/AuthProvider";

export default function ProtectedRoute({children}){
  const navigate=useNavigate();
  const accessToken=true;
  const {user}=useContext(AuthContext);
  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  }, [navigate,accessToken]);

  return <>{children}</>


}
