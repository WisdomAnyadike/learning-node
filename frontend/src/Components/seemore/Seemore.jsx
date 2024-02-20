import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Seemore = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({})
    const {id} = useParams()
    console.log(id);
    useEffect(()=> {
axios.get(`http://localhost:3490/Api/Products/getProducts/${id}`).then((res)=> {
    setData(res.data.product);
}).catch((err)=> {
    console.log(err);
})
    },[])

    const setImage =(e)=> {
      const file = e.target.files[0]
      console.log(file);
      const reader = new FileReader()
      if(file){
        reader.readAsDataURL(file)
      }
      reader.onload = ()=> {
        setData({...data, productImage:reader.result})
      }
    }

    const setName = (e)=> {
        setData({...data, productName:e.target.value})  
    }

    const setDescription = (e)=> {
        setData({...data, productDescription:e.target.value})  
    }
    const setCategory = (e)=> {
        setData({...data, productCategory:e.target.value})  
    }

    const setPrice = (e)=> {
        setData({...data, productPrice:e.target.value})  
    }

    const handleEdit = async(e)=> {
        e.preventDefault();
      try {
        const res = await axios.post(`http://localhost:3490/Api/Products/updateProduct/${id}`, data )
        
        if (res.data.status === 'okay') {
            alert(res.data.message)
navigate('/dashboard')
        }
      } catch (error) {
        alert(error.response.data.message)
        console.log(error);
      }  
        
     
    }

    const handleDelete = async(e)=> {
        e.preventDefault();
        try {
          const res = await axios.post(`http://localhost:3490/Api/Products/deleteProduct/${id}` )
          
          if (res.data.status === 'okay') {
              alert(res.data.message)
          navigate('/dashboard')
          }
        } catch (error) {
          alert(error.response.data.message)
          console.log(error);
        }  
     
      }
  
  return (
    <form>  
    
    <div className='d-flex flex-column'>
    <label> name </label>
    <input onChange={(e)=> setName(e)} value={data.productName} />

    <label > image </label>
    <img width={100} height={100} src={data.productImage}/>
    <input onChange={(e)=> setImage(e)} type='file' />

    <label> price </label>
    <input onChange={(e)=> setPrice(e)}  value={data.productPrice} />

    <label> description </label>
    <input onChange={(e)=> setDescription(e)} value={data.productDescription} />

    <label> category </label>
    <input onChange={(e)=> setCategory(e)} value={data.productCategory} />
    
    <button className='btn btn-success' onClick={(e)=> handleEdit(e)}> Edit </button>  <button onClick={(e)=>handleDelete(e)} className='btn btn-danger' > Delete</button>
    </div>
    
    
    </form>
  
  )
}

export default Seemore