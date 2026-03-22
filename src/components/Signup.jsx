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
    <div className='row justify-content-center mt-4'>
      <div className='card col-md-6 shadow'>
        <h1 className='text-secondary'>Sign Up</h1>

        <h5 className="text-warning"> {loading} </h5>
        <h3 className='text-success'> {success}  </h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}> 


          <input type="text"
          placeholder='Enter the Username'
          className='form-control'
          value={username} 
          onChange={(e)=>setUsername(e.target.value)}
          required/> <br />

          {/* {username} */}

          <input type="email" 
          placeholder='Enter the email address'
          className='form-control'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required/> <br />

          {/* {email} */}

          <input type="password"
          placeholder='Enter the password'
          className='form-control'
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          required /> <br />

          {/* {password} */}

          <input type="tell" 
          placeholder='Enter phone number'
          className='form-control'
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required/> <br />

          {/* {phone} */}

          <input type="submit" value="Sign Up" className='btn btn-primary' /><br /> <br />

          Already have an account? <Link to={'/Signin'}>Signin</Link>
          </form>
        </div>
    </div>
  )
}

export default Signup;

//Research on Axios module in reactjs