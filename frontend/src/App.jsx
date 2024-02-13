import React from 'react'
import { Routes , Route} from 'react-router'
import Signup from './Components/UserAuth/Signup'
import NotFound from './Components/UserAuth/NotFound'
import Login from './Components/UserAuth/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Editprofile from './Components/UserAuth/Editprofile'

const App = () => {
  return (
    <Routes> 
    <Route path={'/signup'} element={<Signup/>}/>
    <Route path={'/login'} element={<Login/>}/>
    <Route path={'/dashboard'} element={<Dashboard/>}/>
    <Route path={'/edit'} element={<Editprofile/>}/>
    <Route path={'/*'} element={<NotFound/>}/>
    </Routes> 
  )
}

export default App
