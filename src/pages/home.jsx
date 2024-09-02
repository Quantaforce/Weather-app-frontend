import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function Home(){
  const navigate=useNavigate();
  return(<>
    <div className="px-6 flex justify-between py-4">
      <div className="text-2xl font-bold">WeatherNow</div> 
      <div>
        <Button variant="ghost" onClick={()=>navigate('/login')} className="">Login</Button>
        <Button variant="ghost" onClick={()=>navigate('/register')} >Sign Up</Button>
      </div>
    </div>
    <div className="m-auto w-fit fixed inset-0 h-fit">
      <div className="text-center text-3xl">Accurate Weather Forecast </div>
      <div className="text-center text-2xl">Anytime Anywhere</div> 
    </div>
    </>
  )

}
