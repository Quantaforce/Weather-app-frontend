import React,{useEffect,useState,useContext} from "react";
import {useNavigate } from "react-router-dom";
import  AuthContext from "../context/AuthProvider";

export default function ProtectedRoute({children}){
  const navigate=useNavigate();
  const accessToken=true;
  const {user}=useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [navigate,accessToken]);

  return <>{children}</>


}
