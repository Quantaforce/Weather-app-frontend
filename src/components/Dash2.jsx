import { useContext, useState ,useEffect} from "react";
import MyResponsiveLine from "./LineChart";
import { Largecity } from "./ui/largeCityCard";
import InteractiveMap from "./ui/map";
import WeatherInfo from "./weatherInfo";
import cityContext from "@/context/DataProvider";
import { CURRENT_WEATHER_URL, LARGE_CITIES} from '../api'
import Header from "./Header";
import useCustomFetch from "@/hooks/useCustomFetch";

export default function Dash() {
  const customFetch=useCustomFetch();
  const {state}=useContext(cityContext);
  const [data,setData]=useState(null);
  const [topcities,setTopcities]=useState(null);
  const [notShow,setNotShow]=useState(true);
  const cityCode=state.cityCode;
  async function usefetch(){
    //const url=CURRENT_WEATHER_URL+CityCode+`?apikey=${API_KEY}&details=true`;
    const url=CURRENT_WEATHER_URL+cityCode;
    const res= await customFetch(url);
    const fres=await res.json();
    setData(fres);
    
    const res2= await customFetch(LARGE_CITIES);
    
    if(res.status==500 || res2.status==500)
      setNotShow(true);
    else setNotShow(false);
    const topcities=await res2.json();
    setTopcities(topcities);

  }
  useEffect(()=>{
    if(cityCode!=null)
      usefetch();
  },[cityCode]);
  if(data==null || notShow)
  return<><Header/>
          <div className="h-[350px]">
            <InteractiveMap/>       
          </div>
  </>;
  return (<>
    <Header/>
  <div className="px-8 mt-4">
      <div className="flex ">
        <WeatherInfo data={(data!=null && data.jsonData) || null}></WeatherInfo>
        <div className="grow ml-8">
          <p className="text-foreground font-bold text-xl pt-2 pl-2">Hourly Temperature</p>
          <div className="h-[16rem] w-full overflow-hidden ">
            <MyResponsiveLine data={data.graphData} Base={data.graphData[0].base}/>
          </div>
        </div>
      </div>
      <div className="flex h-[450px]">
        <div className="p-2 mt-8 h-[400px] w-[900px] font-bold text-xl">
          <p className="mb-6">Global Map</p>
          <div className="h-[350px]">
            <InteractiveMap/>       
          </div>
        </div>
        <div className="p-2 grow mt-8 ml-8 font-bold text-xl">
          <p className="mb-6">Other large Cities</p>
          {topcities && topcities.map((data)=><Largecity data={data}/>)}
       </div>
      </div>
    </div>

  </>)
}
