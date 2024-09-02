import { useForm } from "react-hook-form"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Showpass } from "./ui/passwordIcon";
import { Button } from "./ui/button";

function Register() {
  const {register,handleSubmit,watch,formState:{errors}}=useForm({});
  const baseUrl= import.meta.env.VITE_BASEURL;
  const navigate=useNavigate();
  const onSubmit= async (data)=>{
    const v=await fetch(baseUrl+'api/user/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)  
    });
    navigate('/login')

  }
 
  const [showPass,setShowPass]=useState(false);
  return <div className="h-full flex justify-center items-center ">
    <Card className="w-[350px] pt-5 pb-10">
      <CardHeader >
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input className="mb-4" {...register("name")} placeholder="Name" type="text"/>
          <Input type="email" className="mb-4" {...register("email")} placeholder="Email"/>
          <div className="relative mb-4 flex items-center">
            <Input className="w-full" {...register("password",{
              required:true,
            })} type={showPass?"text":"password"} placeholder="Password" />
            <Showpass onClick={()=>setShowPass(!showPass)} show={showPass} className="absolute right-2 hover:cursor-pointer"/>
          </div>
          <Input className="mb-8" type="password" {...register("confirm_password",{
            required:true,
            validate:(val)=>{return watch('password')===val || "Password do not match"}
          })} placeholder="confirm password" />
          {errors.confirm_password && <p className="text-red-500/100">{errors.confirm_password.message}</p>}
          <Button type="submit " className="mt-2 font-semibold">Sign Up</Button>
        </form>
        <p className="text-sm">Already have an account? <Link className="font-bold hover:underline" to='/login'>Login</Link></p>
      </CardContent>
   </Card>
  </div>
  return <>
    <div>Register</div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="name"/>
      <input {...register("email")} placeholder="email"/>
      <input {...register("password")} placeholder="password"/>
      <button type="submit">Signup</button>
    </form>
  </>
}
export default Register 
