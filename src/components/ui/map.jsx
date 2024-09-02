import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { GEO_POSITION } from '@/api';
import { useCitySelect } from '@/hooks/useSelectCity';
import useCustomFetch from '@/hooks/useCustomFetch';
function InteractiveMap(){
  const customFetch=useCustomFetch();
  const select=useCitySelect();
  async function usefetch(lat,lon){
    const headers={
      'Content-Type': 'application/json',  
    }
    const url=GEO_POSITION+`lat=${lat}&lon=${lon}`;
    const res= await customFetch(url,{
      headers:headers
    });
    const fres=await res.json();
    select(fres);
  }
  const handleClick=(e)=>{
    const ll=e.lngLat;
    usefetch(ll.lat,ll.lng);
  }
  //mapboxAccessToken="pk.eyJ1IjoicXVhbnRhZm9yY2UiLCJhIjoiY2x5Y3NjeTh3MTVvczJqcGh3MGVtNGl6MCJ9.7D8QvwExQaUbmrqLdAj5vg"

  return (
    <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom:2 
          }}
          style={{ borderRadius:15}}
          mapStyle="mapbox://styles/quantaforce/cly7rna7r00gp01qvfmlx0psr"
          onClick={handleClick}
        />
  )
}
export default InteractiveMap;
