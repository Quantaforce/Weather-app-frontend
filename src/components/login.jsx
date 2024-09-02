import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Showpass} from "./ui/passwordIcon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
function Login() {
  const {user,setUser} = useContext(AuthContext);
  const baseUrl= import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();
  if(user)
    navigate("/",{replace:true});
  const {register, handleSubmit}=useForm();
  const onSubmint=async (data)=>{
    const response= await fetch(baseUrl+'api/user/login', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include', 
      body:JSON.stringify(data)
    } );

    const jsonResponse=await response.json();
    localStorage.setItem('accessToken',jsonResponse.accessToken);
    setUser(jsonResponse.accessToken);
    localStorage.setItem('refreshToken',jsonResponse.refreshToken);
    navigate("/");
  }
  const [showPass,setShowPass]=useState(false);
  return <div className="h-full flex justify-center items-center ">
    <Card className="w-[350px] pt-5 pb-10">
      <CardHeader >
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <form onSubmit={handleSubmit(onSubmint)}>
          <Input className="mb-4" {...register("email")} placeholder="Email"/>
          <div className="relative mb-8 flex items-center">
            <Input className="w-full" {...register("password")} type={showPass?"text":"password"} placeholder="Password" />
            <Showpass onClick={()=>setShowPass(!showPass)} show={showPass} className="absolute right-2 hover:cursor-pointer"/>
          </div>
          <Button type="submit " className="font-semibold">Login</Button>
        </form>
        <p className="text-sm">Don't have an account? <Link className="font-bold hover:underline" to='/register'>Sign up</Link></p>
      </CardContent>
   </Card>
  </div>

  return <>
    <div>login</div>
    <form onSubmit={handleSubmit(onSubmint)}>
      <input {...register("email")} placeholder="email"/>
      <input {...register("password")} type="password" placeholder="password" />
      <button type="submit">login</button>
    </form>
  </>
}
export default Login 
