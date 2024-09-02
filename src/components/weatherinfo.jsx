//import dataList from '../data2.json';  
//import img from '../assets/icons'
import "./styling/weatherinfo.css"
import { weekday } from "@/constants";
function Weatherinfo({data}){
  const dataList=data==null ? data2:data;
  const currentDate=new Date(dataList[0].EpochTime*1000);
  const currentDay= weekday[currentDate.getDay()];
  const currentTime=`${currentDate.getHours()}:${currentDate.getMinutes()}`
  //src/assets/icons/${dataList[0].WeatherIcon}.png`
  return <>{dataList &&  <div className='infocard'>
    <div className='title-container'>{currentDay} , {currentTime}</div>
      <div className='info-container'>
        <div className='weather-detail-card-parent'>
          <div className='weather-detail-card'>
            <img src={`https://res.cloudinary.com/dz8r7kufh/image/upload/${dataList[0].WeatherIcon}.png`} className='weather-icon' alt="weather-icon"/>
            <div className='temp-container'>
              <div className='temp-detail'>{Math.round(dataList[0].Temperature.Metric.Value)}°<span className='temp-unit'>{dataList[0].Temperature.Metric.Unit}</span>
              </div>
              <div className='real-feel'>RealFeel {Math.round(dataList[0].RealFeelTemperature.Metric.Value)}°</div>
            </div>
          </div>
          <div className='phrase'>{dataList[0].WeatherText}</div>
        </div>
        <div className='wind-info'>
           <div className='wind-info-line'>
              <span className='label'>wind</span>
              <span className='value'>{Math.round(dataList[0].Wind.Speed.Metric.Value)}{dataList[0].Wind.Speed.Metric.Unit}</span>
           </div>
           <div className='wind-info-line'>
              <span className='label'>wind gust</span>
              <span className='value'>{Math.round(dataList[0].WindGust.Speed.Metric.Value)}{dataList[0].WindGust.Speed.Metric.Unit}</span>
           </div>
           <div className='wind-info-line'>
              <span className='label'>humidity</span>
              <span className='value'>{dataList[0].RelativeHumidity}%</span>
           </div>
           <div className='wind-info-line'>
              <span className='label'>pressure</span>
              <span className='value'>{dataList[0].Pressure.Metric.Value} mb</span>
           </div>
        </div>

      </div>
    </div>
}</> }
export default Weatherinfo;
