import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "./ui/separator"
import { useContext, useEffect, useState } from "react"
import { weekday } from "@/constants"
import useCustomFetch from "@/hooks/useCustomFetch";
import { NEXT_DAYS } from "@/api";
import cityContext, { CityProvider } from "@/context/DataProvider";
function MiniCard({data}) {
  const time= new Date(data.EpochDate*1000);
  const day=weekday[time.getDay()].substr(0,3);
  return (
    <Card className="max-w-20 flex flex-col h-full">
      <CardHeader className="py-2">
        {day}
      </CardHeader>
      <Separator className="w-16 m-auto h-[2px]"/>
      <div className="flex flex-col justify-around h-full">
        <img src={`https://res.cloudinary.com/dz8r7kufh/image/upload/${data.Day.Icon}.png`}/>
        <p className="font-bold text-3xl text-center">{data.Temperature.Maximum.Value}°</p>
      </div>

    </Card>
  )
  
}
function MaxCard({data}) {
  const time= new Date(data.EpochDate*1000);
  const day=weekday[time.getDay()];
  const sunset= new Date(data.Sun.EpochSet*1000);
  const sunsetTime=`${sunset.getHours()}:${sunset.getMinutes()}`;
  const sunrise= new Date(data.Sun.EpochRise*1000);
  const sunriseTime=`${sunrise.getHours()}:${sunrise.getMinutes()}`
  return (
    <Card className="min-w-48 bg-[#9dcdf3] text-black">
      <div className="rounded-t-lg py-3 px-2.5 bg-[#92bfe0] flex justify-between font-bold">
       <p>{day}</p> 
        <p>11:42AM</p>
      </div>
      <CardContent className="">
        <div className="flex">
          <p className="font-bold mt-4 text-5xl">{data.Temperature.Maximum.Value}</p>
          <img className="size-28 relative -top-2 left-6" src={`https://res.cloudinary.com/dz8r7kufh/image/upload/${data.Day.Icon}.png`} />
        </div>
        <div className="-mt-6">
          <p className="leading-5"><span className="text-muted-foreground font-bold">Real Feel: </span>{data.RealFeelTemperature.Maximum.Value}</p>
          <p className="leading-5"><span className="text-muted-foreground font-bold">Sunrise: </span>{sunriseTime}</p>
          <p className="leading-5"><span className="text-muted-foreground font-bold">Sunset: </span>{sunsetTime}</p>
        </div>
      </CardContent>
    </Card>
  )
  
}
export default function Next7days(){
  const [selected,setSelected]= useState(0);
  const [data,setData]=useState(null);
  const {state}=useContext(cityContext);
  const citycode=state.cityCode;
  const toggle=(item)=>{
    setSelected(item);
  }
  async function fetchData(){
    const url=NEXT_DAYS+citycode;
    const res=await customFetch(url);
    const fres=await res.json();
    setData(fres.DailyForecasts);
  }
  const customFetch=useCustomFetch();
  useEffect(()=>{
    fetchData();
  },[]);
  //const x=data.DailyForecasts;
  return(
    data!=null?
    <div className="flex justify-between">
      {data.map((item,index)=>index==selected?<MaxCard key={index} data={item}/>:<div key={index} onClick={()=>toggle(index)}><MiniCard data={item} key={index}/></div>)}
    </div>:<div>loading</div>
  )
}
