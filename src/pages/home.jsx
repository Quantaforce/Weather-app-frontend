import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/context/AuthProvider";
export default function Home(){
  const navigate=useNavigate();
  const {user}=useContext(AuthContext);
  return(<>
    <div className="px-6 flex justify-between py-4">
      <div className="text-2xl font-bold">WeatherNow</div> 
      {!user ?
        <div>
          <Button variant="ghost" onClick={()=>navigate('/login')} className="">Login</Button>
          <Button variant="ghost" onClick={()=>navigate('/register')} >Sign Up</Button>
        </div>
       :
        <div>
          <Button variant="ghost" onClick={()=>navigate('/dashboard')} className="">Go To Dashboard</Button>
        </div>
      }
    </div>
    <div className="m-auto w-fit fixed inset-0 h-fit">
      <div className="text-center text-3xl">Accurate Weather Forecast </div>
      <div className="text-center text-2xl">Anytime Anywhere</div> 
    </div>
    </>
  )

}
