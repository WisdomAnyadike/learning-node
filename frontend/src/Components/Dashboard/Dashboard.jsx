import React, { useEffect } from "react";
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

  return (
    <div>
      Dashboard
      <button className="btn btn-danger" onClick={handleLogout}>
        log out
      </button>
      <button onClick={handleEdit}> edit profile</button>
      <button onClick={handleDelete}> delete account </button>
    </div>
  );
};

export default Dashboard;
