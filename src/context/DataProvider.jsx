import { useReducer, useState } from "react";
import { createContext} from "react";
const intitialState={
	cityCode:202396,
	cityName:'Delhi, Delhi, India',

}
export const Actions={
	SETCITYCODE:'setCityCode',
	SETCITYNAME:'setCityName'
}
const reducer=(state,action)=>{
	switch(action.type){
		case Actions.SETCITYCODE:
			return {...state,cityCode:action.payload};
		case Actions.SETCITYNAME:
			return {...state,cityName:action.payload};
		default:
			return state;
		
	}
};
const cityContext = createContext("");
export function CityProvider({children}) {
	const [state,dispatch]=useReducer(reducer,intitialState);
	const [cityCode,setCityCode]=useState("");
	return <cityContext.Provider value={{state,dispatch}}>
			{children}
		</cityContext.Provider>
}
export default cityContext;
