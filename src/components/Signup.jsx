import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  //Initialize the hooks
  const [username , setUsername]= useState("");
  const[email, setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");

  //define the 3 state application will move to
  const [loading ,setLoading] =useState("");
  const [success, setSuccess]=useState("");
  const [error, setError]= useState("");

  //below is a function that will handle the submit action
  const handleSubmit =async(e)=>{
    //Below we prevent our site from reloading
    e.preventDefault()
    //Update our loading hook that will be displayed to the users who are trying to register
    setLoading("Please wait as registration is in progress...")

    try{
      //create a form data object that will enable you to capture the four details entered on the form
      const formdata=new FormData();
      //Insert the 4 details (username , email, password, phone)in terms of key-value pairs
      formdata.append("username", username);
      formdata.append("email" , email);
      formdata.append("password" , password);
      formdata.append("phone" ,phone);

      //by the use of anxios , we can access the method post
      const response =await axios.post("https://victoria.alwaysdata.net/api/signup" , formdata)
      //set back to the loading default
      setLoading("");

      //just incase everythimh goes on well, update the success hook with a message
      setSuccess(response.data.message)

      //clear your hooks
      setUsername("");
      setEmail("");
      setPhone("");
      
      setTimeout(() =>{
        setSuccess("");
      } , 5000);

    console.log("the content inside of the response are:", response)

    }
    catch(error){
      //set the loading back to default
      setLoading("");

      //update the error hook with the message given back from the response 
      setError(error.message)
    }

  }

  return (
  <div 
  className="row justify-content-center align-items-center min-vh-100"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="col-md-5">
    <div 
      className="card shadow-lg border-0 rounded-4 p-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
    >

      <div className="text-center mb-4">
        <h2 style={{ fontFamily: "serif", color: "#8B0000" }}>
          🍰 Join Bite Bright
        </h2>
        <p className="text-muted">Create an account to enjoy our delicacies</p>
      </div>

      {/* Status Messages */}
      {loading && <div className="alert alert-warning text-center py-2">{loading}</div>}
      {success && <div className="alert alert-success text-center py-2">{success}</div>}
      {error && <div className="alert alert-danger text-center py-2">{error}</div>}

      <form onSubmit={handleSubmit}> 

        <div className="mb-3">
          <input
            type="text"
            placeholder="👤 Username"
            className="form-control form-control-lg rounded-3"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="📧 Email address"
            className="form-control form-control-lg rounded-3"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="🔒 Password"
            className="form-control form-control-lg rounded-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            placeholder="📱 Phone number"
            className="form-control form-control-lg rounded-3"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button 
            className="btn btn-lg rounded-3 fw-semibold"
            style={{
              backgroundColor: "#8B0000",
              color: "white"
            }}
          >
            🍽️ Sign Up
          </button>
        </div>

        <div className="text-center">
          <small className="text-muted">
            Already have an account?{" "}
            <Link 
              to="/Signin" 
              className="fw-semibold"
              style={{ color: "#8B0000" }}
            >
              Sign In
            </Link>
          </small>
        </div>

      </form>
    </div>
  </div>
</div>

  )
}

export default Signup;

//Research on Axios module in reactjs