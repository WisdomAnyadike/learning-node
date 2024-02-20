import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/Usercontext'

const Login = () => {
const navigate = useNavigate()
  const [Email , setEmail] = useState('')
  const [Password , setPassword] = useState('')
  let {setCurrentUser} = useContext(userContext)

  const handleSubmit = async(e)=> {
    e.preventDefault()

    const userDetails = {
      Email , 
      Password
    }
    console.log( "Userdetails:" ,  userDetails);
    try {
      const res = await axios.post('http://localhost:3490/Api/User/login' , userDetails)

      if (res.data.status === "success"){
        alert( res.data.message + '\n' + 'welcome ' + " " +  res.data.User.FullName )
        localStorage.setItem('token' , res.data.genToken)
        setCurrentUser(res.data.User)
       navigate('/dashboard')
      }

      
    } catch (error) {
      alert(error.response.data.message)
    }


  }
 
  return (
    
    <form className='w-25 mx-auto mt-5'   >
   
    <div className="form-outline mb-4">
      <input onChange={(e)=> setEmail(e.target.value)} type="email" id="form2Example1" className="form-control" />
      <label className="form-label" htmlFor="form2Example1">Email address</label>
    </div>
  
   
    <div className="form-outline mb-4">
      <input onChange={(e)=> setPassword(e.target.value)} type="password" id="form2Example2" className="form-control" />
      <label className="form-label" htmlFor="form2Example2">Password</label>
    </div>
  
   
    <div className="row mb-4">
      <div className="col d-flex justify-content-center">
      
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
          <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
        </div>
      </div>
  
      <div className="col">
     
        <a href="#!">Forgot password?</a>
      </div>
    </div>
  
 
    <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Sign in</button>
  

    <div className="text-center">
      <p>Not a member? <Link to="/signup"> Register </Link> </p>
    </div>
  </form>
  )
}

export default Login