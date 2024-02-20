import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Components/context/Usercontext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <UserProvider> 
  <App />
  </UserProvider>

  </BrowserRouter>
 
  </React.StrictMode>,
)
