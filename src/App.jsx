import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import AuthLayout from "./components/AuthLayout.jsx";
import AuthPrevLayout from "./components/AuthPrevLayout.jsx";
import AuthContext from "./context/AuthProvider.jsx"; 
import { useContext, useEffect, useState } from "react";
import Dash from "./components/Dash2.jsx";
import Home from "./pages/home.jsx"

const router=createBrowserRouter([
  {
      path:'/dashboard',
      element:
        /*<Dash></Dash>*/
        <AuthLayout >
          <Dash/>
        </AuthLayout>
    },
    {
      path:'login',
      element:
        <AuthPrevLayout>
          <Login/>
        </AuthPrevLayout>
    },
    {
      path:'register',
      element:(<AuthPrevLayout>
                <Register/>
              </AuthPrevLayout>),
    },
    {
      path:'/',
      element:(<Home/>),
    }
  ,
])

function App() {
    const {user,setUser}=useContext(AuthContext);
  useEffect(()=>{
    const accessToken=localStorage.getItem('accessToken');
    setUser(accessToken);
  },[])
  return (
  <>
    <RouterProvider router={router}/>
  </>
  )
}
export default App;
