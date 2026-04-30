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