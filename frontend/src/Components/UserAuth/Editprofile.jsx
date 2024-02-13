import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Editprofile = () => {
    const navigate = useNavigate()
const [FullName , SetFullName]= useState('')
const [Email , SetEmail]= useState('')
const [Password , SetPassword]= useState('')

const handleEdit = async (e)=> {
    const token = localStorage.getItem("token")
e.preventDefault()
const UserDetails = { FullName , Email , Password}
try {
  const res = await axios.post('http://localhost:3490/Api/User/editAcc' , UserDetails,{
    headers:{
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
    }
  })
  console.log("recieved response:" , res.data);

  if(res.data.status === "success"){
    alert(res.data.message)
    navigate('/dashboard')
  }
  
  
} catch (error) {
  alert(error.response.data.message)
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
                  <h2 className="text-uppercase text-center mb-5">Edit your account</h2>
    
                  <form action='' onSubmit={handleEdit}>
    
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
                      <label className="form-label" htmlFor="form3Example4cg"> Current Password</label>
                    </div>
    
    
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>
    
                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">edit</button>
                    </div>
    
                 
    
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

export default Editprofile