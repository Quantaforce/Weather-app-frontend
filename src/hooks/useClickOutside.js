import { useEffect } from "react";

export function useClickOutside(ref,onClickOutside){
  useEffect(()=>{

    function handleClick(event){
      if(ref.current && !ref.current.contains(event.target))
        onClickOutside();
    }
    document.addEventListener("mousedown",handleClick);
    return ()=>{
      document.removeEventListener("mousedown",handleClick);
    };
  },[ref,onClickOutside]);
}
