import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const GetProducts = () => {
  
  //Initialize hook to hep you manage the state of your application
  const [products, setProducts]= useState([]);
  const[loading, setLoading] = useState(false);
  const[error , setError]=useState("");

  //declare the navigate hook
  const navigate = useNavigate()

  //below we specify the image base url
  const  img_url=" https://victoria.alwaysdata.net/static/images/"


  //create a function to help you fetch the products from your API
  const fetchProducts = async ()=>{
    try{
      //update the loading hook
      setLoading(true)


      //interact with you end point for fetching the product
      const response = await axios.get("https://victoria.alwaysdata.net/api/get_products")

      //update the products hook with the response given from the API
      setProducts(response.data)

      //set the loading hook back to default
      setLoading(false)

    }
    catch(error){
      //if there is an error:
      //1. set the loading back to default
      setLoading(false)

      //update the error hook with a message
      setError(error.message)

    }
  }

  //we shall use the useEffect hook that enables us to automatically re-render new features incase of any changes.
  useEffect(()=> {
    fetchProducts()
  },[])//the [] is a trigger effect

  //console.log("The products fetched are:", products)




  return (
    <div className='row'>
      <h2 className="text-secondary">Available Delicacies</h2>
      {loading && <Loader/>}
      <h4 className="text-danger">{error}</h4>

         {/*map the products fetched from the API  to the user interface  */}

         {products.map((product) => (
          <div className="col-md-3 justify-content mb-3">

        <div className="card shadow">

          <img src={img_url + product.product_photo} 
          alt="product name" 
          className='product_img mt-3' />

          <div className="card-body">
            <h5 className="text-success">{product.product_name}</h5>
            <p className="text-dark">{product.product_description.slice(0,100)}...</p>
            <h4 className="text-warning">KES {product.product_cost}</h4>

            <button className="btn btn-outline-info"onClick={()=> navigate("/makepayment",{state :{product}})}>Purchase now</button>
          </div>


        </div>
      </div>
         ) )}


    </div>
  )
}

export default GetProducts;
