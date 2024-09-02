import { useCitySelect } from "@/hooks/useSelectCity";
import { Card, } from "./card";


export const Largecity=({data})=>{
  const select=useCitySelect();

  return (
    <Card onClick={()=>select(data)} className="min-w-[300px] mb-2 hover:cursor-pointer hover:bg-muted flex items-center justify-between py-1 px-3">
      <div>
        <p className="text-muted-foreground text-sm">{data.Country.ID}</p>
        <p>{data.EnglishName}</p>
        <p className="font-normal text-base">{data.WeatherText}</p>
      </div>
      <div className="flex flex-col w-[70px] ">
       <img src={`https://res.cloudinary.com/dz8r7kufh/image/upload/${data.WeatherIcon}.png`} />
        <p className="m-auto text-xl relative -top-2 font-bold">32°</p>
      </div>
    </Card>
  )
}
