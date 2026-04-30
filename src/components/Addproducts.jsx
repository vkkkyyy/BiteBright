import React, { useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import Category from './Category'

const Addproducts = () => {

  //introduce the hooks
  const [product_name, setProductName]= useState("")
  const [product_description, setProductDescription]=useState("")
  const [product_cost, setProductCost]= useState("")
  const[product_photo, setProductPhoto]= useState("")
  const [selectedCategory,setSelectedCategory] = useState("")

   //Define the list to pass into the Category component
  const categoryList = ["Appetizers", "Main Course", "Desserts", "Drinks", "Specials"];

  //declare three additional hooks to manage the state of your application
  const[loading , setLoading]= useState(false);
  const[success , setSuccess]= useState("");
  const[error , setError] = useState("")

// create a function tha will handle the submit action
  const handleSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()
    // setloading hook with a message (activate it)
    setLoading(true)

try{
//create a form data
const formdata =new FormData()

//append the details to the form data created 
formdata.append("product_name" , product_name);
formdata.append("product_description" , product_description);
formdata.append("product_cost" , product_cost);
formdata.append("product_photo", product_photo);
formdata.append("category", selectedCategory); 

//interact with axios to help you use the method post
const response = await axios.post("https://victoria.alwaysdata.net/api/add_product" , formdata)

//set the loading hook back to default/empty
setLoading(false)

// update the success hook with a message 
setSuccess(response.data.message)

//clearing the hooks
setProductName("");
setProductDescription("");
setProductCost("");
setProductPhoto("");
setSelectedCategory(""); 

e.target.reset()//to clear the file and any other details

setTimeout(()=>{
  setSuccess("");
},5000);

}
catch(error){

  //set loading the hook back to default 
  setLoading(error)
 
  //update the setError with a message
  setError(error.message)
}


  }


  return (
  <div 
  className="row justify-content-center align-items-center min-vh-100"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="col-md-6">
    <div 
      className="card shadow-lg border-0 rounded-4 p-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
    >

      <div className="text-center mb-4">
        <h2 style={{ fontFamily: "serif", color: "#8B0000" }}>
          🍽️ Add a New Delicacy
        </h2>
        <p className="text-muted">Craft and showcase your delicious meals</p>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Messages */}
      {success && <div className="alert alert-success text-center py-2">{success}</div>}
      {error && <div className="alert alert-danger text-center py-2">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input 
            type="text"
            placeholder="🍝 Meal Name"
            className="form-control form-control-lg rounded-3"
            required
            value={product_name}
            onChange={(e)=>setProductName(e.target.value)}
          />
        </div>

        <Category 
              categories={categoryList} 
              selectedCategory={selectedCategory} 
              onChange={setSelectedCategory} 
            />

        <div className="mb-3">
          <input
            type="text"
            placeholder="📝 Meal Description"
            className="form-control form-control-lg rounded-3"
            required
            value={product_description}
            onChange={(e)=>setProductDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="💰 Price (KES)"
            className="form-control form-control-lg rounded-3"
            required 
            value={product_cost}
            onChange={(e)=>setProductCost(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-semibold" style={{ color: "#8B0000" }}>
            📸 Upload Meal Photo
          </label>
          <input 
            type="file"
            className="form-control rounded-3"
            required
            accept="image/*"
            onChange={(e)=>setProductPhoto(e.target.files[0])}
          />
        </div>

        <div className="d-grid">
          <button 
            className="btn btn-lg rounded-3 fw-semibold"
            style={{
              backgroundColor: "#8B0000",
              color: "white"
            }}
          >
            🍷 Add Meal
          </button>
        </div>

      </form>
    </div>
  </div>
</div>


  )
}

export default Addproducts;
