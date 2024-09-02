import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Actions } from "@/context/DataProvider";
import cityContext from "@/context/DataProvider";
import { Input } from "./ui/input";
import { SUGGESTION_URL } from "@/api";
import { useCitySelect } from "@/hooks/useSelectCity";
import { useClickOutside } from "@/hooks/useClickOutside";
import useCustomFetch from "@/hooks/useCustomFetch";

function Search(){
  const customFetch=useCustomFetch();
  const {dispatch} = useContext(cityContext);
  const [content,setContent]=useState([]);
  const [open,setOpen]=useState(false);
  const [city,setCity]=useState("");
  const [index,setIndex]=useState(-1);
  const ref=useRef("result");
  const selectedResult=useRef(null);
  useClickOutside(ref,()=>{
    setOpen(false);
    setIndex(-1);
  })
  const select=useCitySelect();
  function citySelect(value){
    select(value);
    setOpen(false);
  }
  //for keydown
  const handleKeyDown=(e)=>{
    const l=content.length;
    if(e.key=="ArrowUp"){
      setIndex((index-1+l)%l);
    }
    else if(e.key=="ArrowDown"){
      setIndex((index+1)%l)
    }
    else if(e.key=="Escape"){
      setOpen(false);
    }
    else if(e.key=="Enter"){
      e.preventDefault();
      if(index!=-1){
        citySelect(content[index]);
      }
      
    }
      
  }
  async function getKey(){
    const url=SUGGESTION_URL+`q=${city}`;
    //const url='api/autocomplete'+`&q=${city}`;
  
    const headers={
      'Content-Type': 'application/json',  
    }
    const res=await customFetch(url,{
      headers:headers
    });
    const fres=await res.json();
    setContent(fres);
    //setContent(suggestions);
    setOpen(true);
  }
  useEffect(()=>{
    if(!selectedResult.current)return;
    selectedResult.current.scrollIntoView({block:'nearest'});
  },[index]);
  useEffect(()=>{
    if(city!=""){
      const t1=setTimeout(getKey,1000);
      return ()=>clearTimeout(t1);
    }
    else{
      setContent({});
      setOpen(false);
    }
  },[city]);
  function handleChange(e){
    setCity(e.target.value);
  }
  return (<div className="relative w-72">
      <div className="flex items-center border-2 rounded-xl px-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
        <Input type="search" onInput={handleChange} className="border-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search city..." onKeyDown={handleKeyDown} />
      </div>
    <div ref={ref} className="overflow-y-scroll bg-background max-h-72 absolute w-full z-50">
      {
      open &&  content.map((value,idx)=>{return <div onClick={()=>citySelect(value)} onMouseEnter={()=>{setIndex(idx)}} onMouseLeave={()=>{setIndex(-1)}} className={"px-1 py-2 hover:cursor-pointer" + (index==idx?' bg-muted':'')} key={value.Key} ref={index==idx?selectedResult:null} >{value.LocalizedName}, {value.AdministrativeArea.ID}, {value.Country.ID}</div>})   
      }
    </div>
     </div> 
  )
}
export default Search;
