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
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className='text-secondary'>Sign in </h1>

        <h5 className="text-info">{loading}</h5>
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>


          <input type="email"
          placeholder='Enter your Email address here...'
          className='form-control'
          required 
          value ={email}
          onChange={(e)=>setEmail(e.target.value)}/> <br />

          {/* {email} */}

          <input type="password"
          placeholder='Enter your password here...'
          className='form-control' 
          required
          value ={password}
          onChange={(e)=>setPassword(e.target.value)}/> <br />

          {/* {password} */}

          <input type="submit"
          value="Sign in"
          className='btn btn-info'/><br></br>

          Don't have an account? <Link to={'/Signup'}>Register</Link>

        </form>
      </div>
    </div>
  )
}

export default Signin;

//how to stop the user details into the local storage
