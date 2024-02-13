import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
const [FullName , SetFullName]= useState('')
const [Email , SetEmail]= useState('')
const [Password , SetPassword]= useState('')

const handleSubmit = async (e)=> {
e.preventDefault()
const UserDetails = { FullName , Email , Password}
try {
  const res = await axios.post('http://localhost:3490/Api/User/signup' , UserDetails)
  if(res.data.status === "success"){
    alert(res.data.message)
    navigate('/login')
  }
  
  
} catch (error) {
  alert('unable to create account')
}

    }

   
  return (
    <div>
<section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:'15px'}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form action='' onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                  <input onChange={(e)=> SetFullName(e.target.value)} type="text" id="form3Example1cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input onChange={(e)=> SetEmail(e.target.value)} type="email" id="form3Example3cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input onChange={(e)=> SetPassword(e.target.value)} type="password" id="form3Example4cg" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form3Example4cg">Password</label>
                </div>


                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" htmlFor="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                    className="fw-bold text-body"><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  )
}

export default Signup


// try {
//     const res = await fetch('http://localhost:3490/Api/User/signup', {
//         method:'POST',
//         body: JSON.stringify(UserDetails)
//      })
    
//      const data = await res.json()
//      console.log( "recieved data " , data);
// } catch (error) {
//     console.log(error);
// }