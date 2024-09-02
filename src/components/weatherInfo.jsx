import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Next7days from "./Next7days"
import Weatherinfo from "./weatherinfo"

export default function WeatherInfo({data}) {
  return <div className="w-[900px] h-[275px] ">
      <Tabs defaultValue="Today" className="w-full" >
        <TabsList className=" bg-inherit w-full flex justify-start">
          <TabsTrigger className="font-semibold pl-0 text-base" value="Today">Today</TabsTrigger>
          <TabsTrigger className="font-semibold text-base"  value="Tommorow">Tommorow</TabsTrigger>
          <TabsTrigger className="font-semibold text-base" value="Next">Next 7 days</TabsTrigger>
        </TabsList>
        <TabsContent value="Today">
          <Weatherinfo data={data}/>
        </TabsContent>
        <TabsContent value="Next">
          <Next7days></Next7days>
        </TabsContent>

      </Tabs>
    </div>
}
