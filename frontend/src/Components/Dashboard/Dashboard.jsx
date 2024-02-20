import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token == "") {
      alert("Youre not authorized to view this page");
      navigate("/signup");
    }
  }, []);

  const [data , setData] = useState([])

  const navigate = useNavigate();
  const handleLogout = () => {
    const verifyLogout = window.confirm("are you sure?");
    if (verifyLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleEdit = () => {
    navigate("/edit");
  };

  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3490/Api/User/delete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      );

      if (res.data.status === "success") {
        alert(res.data.message);
        navigate("/signup");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  useEffect(()=> {
    axios.get('http://localhost:3490/Api/Products/getProducts').then((res)=> {
setData(res.data.data);
    }).catch((err)=> { console.log(err);})
  },[])

  const move = (id)=> {
    console.log(id);
     navigate(`/seemore/${id}`)
  }

  return (
    <div className="d-flex flex-column space-around">
      Dashboard
      <button className="btn btn-danger" onClick={handleLogout}>
        log out
      </button>
      <button onClick={handleEdit}> edit profile</button>
      <button onClick={handleDelete}> delete account </button>
      <div className="w-50"> 
      { data.map((d)=> 
      <button onClick={()=> move(d._id)} key={d._id} className="ms-4"> 
      <h1> {d.productName}</h1>
      <p> N{d.productPrice} </p>
      <img width={100} height={100} src={d.productImage} />
      <p> {d.productCategory} </p>
      </button>
   
      )}
      
      </div>
    </div>
  );
};

export default Dashboard;
