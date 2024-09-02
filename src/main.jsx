import React  from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CityProvider } from './context/DataProvider.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
if(process.env.NODE_ENV==='production')disableReactDevTools();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CityProvider>
        <App/>
      </CityProvider>
    </AuthProvider>
  </React.StrictMode>
)
