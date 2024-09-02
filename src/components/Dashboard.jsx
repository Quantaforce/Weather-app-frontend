import { useContext, useEffect, useState } from 'react'
import Weatherinfo from './weatherinfo'
import Search from './search'
import { CURRENT_WEATHER_URL } from '../api'
import AuthContext from '../context/AuthProvider';
//const url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete/?apikey=DjVxGius2frrcSYm8lcv9NGF1JHnxG4m&q="

function Dashboard() {
  const [CityCode,setCityCode]=useState(null);
  const [data,setData]=useState(null);
  const {user}=useContext(AuthContext);
  async function usefetch(){
    //const url=CURRENT_WEATHER_URL+CityCode+`?apikey=${API_KEY}&details=true`;
    const headers={
      'Content-Type': 'application/json',  
      'Authorization': `Bearer ${user}`
    }
    const url=CURRENT_WEATHER_URL+CityCode;
    const res= await fetch(url,{
      headers:headers
    });
    const fres=await res.json();
    console.log(fres);
    setData(fres);

  }
  useEffect(()=>{
    if(CityCode!=null)
      usefetch();
  },[CityCode]);
  return <>
    <div className='navbar'>
      <Search setCityCode={setCityCode} />
    </div>
    <Weatherinfo data={data} CityCode={CityCode}/> 
  </>
}

export default Dashboard 
