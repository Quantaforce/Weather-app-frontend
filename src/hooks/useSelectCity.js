import { Actions } from "@/context/DataProvider";
import cityContext from "@/context/DataProvider";
import { useContext } from "react";

export function useCitySelect(){
  const {state,dispatch}=useContext(cityContext);
  //console.log(state);
  const select=(value)=>{
    dispatch({type:Actions.SETCITYCODE,payload:value.Key}) 
    dispatch({type:Actions.SETCITYNAME,payload:`${value.LocalizedName}, ${value.AdministrativeArea?.LocalizedName}, ${value.Country.LocalizedName}`}) 
  }
  return (value)=>select(value);
}
