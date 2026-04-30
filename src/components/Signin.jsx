import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  //define the 2 hooks for capturing /storing the users input
  const [email, setEmail]= useState("");
  const[password, setPassword]= useState(""); 
  
  //Declare the 3 additional hooks
  const [loading,setLoading]=useState("");
  const [success , setSuccess]=useState("");
  const [error, setError]=useState("");

  //below we have the useNavigate to direct us to another page on successful 
  const navigate =useNavigate()

  //Below is the function to handle the sign in action
  const handlesubmit= async(e)=> {
    //prevent the site from reloading
    e.preventDefault()

    //update the loading hook with message
    setLoading("Please wait while we aunthenticate your account...")

    try{
      //create a formData object that will hold the email and the password
      const formdata = new FormData()

      //Inser the email & password on the FormData
      formdata.append("email", email)
      formdata.append("password", password)

      //insert the axios for the response
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      //set loading back to default
      setLoading("");
      //check wheather the user exist as part of the API
      if(response.data.user&& response.data.user){
        //if user is there , definately entered during signin are correct 

        //setSuccess("Log in successful ")

        ///if it is successful let the user be dirrected to another page
        navigate("/");

        //save user object to local storage 
        localStorage.setItem("user".JSON.stringify(response.data.user));
      }
      else{
        //user is not found , that means the credential entered on the form are incorrect
        setError("Login Failed.Please try again...")
      }

    }
    catch(error){
      //set loading back to default 
      setLoading("")

      //update the error hook with a message
      setError("Oops , something went wrong.Try again...")
    }
  }


  return (
    <div className="row justify-content-center align-items-center min-vh-100" 
     style={{
       backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
       backgroundSize: "cover",
       backgroundPosition: "center"
     }}>

  <div className="col-md-5">
    <div className="card border-0 shadow-lg p-4 rounded-4"
         style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>

      <div className="text-center mb-4">
        <h2 style={{ fontFamily: "serif", color: "#8B0000" }}>
          🍷 Bite Bright
        </h2>
        <p className="text-muted">Sign in to explore our delicacies</p>
      </div>

      {/* Status Messages */}
      {loading && <div className="alert alert-warning text-center py-2">{loading}</div>}
      {success && <div className="alert alert-success text-center py-2">{success}</div>}
      {error && <div className="alert alert-danger text-center py-2">{error}</div>}

      <form onSubmit={handlesubmit}>

        <div className="mb-3">
          <input
            type="email"
            placeholder="📧 Enter your email"
            className="form-control form-control-lg rounded-3"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="🔒 Enter your password"
            className="form-control form-control-lg rounded-3"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid mb-3">
          <button 
            className="btn btn-lg rounded-3 fw-semibold"
            style={{
              backgroundColor: "#8B0000",
              color: "white"
            }}>
            🍽️ Sign In
          </button>
        </div>

        <div className="text-center">
          <small className="text-muted">
            New here?{" "}
            <Link to="/Signup" className="fw-semibold" style={{ color: "#8B0000" }}>
              Create an account
            </Link>
          </small>
        </div>

      </form>
    </div>
  </div>
</div>
  )
}

export default Signin;

//how to stop the user details into the local storage
