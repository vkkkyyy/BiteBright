import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import FoodChatbot from "../components/FoodChatbot";
import Carousel from "./Carousel";


const GetProducts = () => { 
  //Initialize hook to hep you manage the state of your application
  const [products, setProducts]= useState([]);
  const[loading, setLoading] = useState(false);
  const[error , setError]=useState("");

  //declare the navigate hook
  const navigate = useNavigate()

  //below we specify the image base url
  const  img_url="https://victoria.alwaysdata.net/static/images/"


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
    <>

    {/* 🍽️ Carousel goes FIRST */}
    <Carousel />

    {/* Main Menu Section */}
  <div 
  className="container-fluid py-5"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  }}
>

  {/* Overlay */}

  
  <div style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: "30px", borderRadius: "20px" }}>

    <h2 
      className="text-center mb-5"
      style={{ fontFamily: "serif", color: "#8B0000" }}
    >
      🍽️ Available Delicacies
    </h2>

    {loading && <Loader />}
    {error && <div className="alert alert-danger text-center">{error}</div>}

    <div className="row g-4">

      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>

          <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">

            {/* Image */}
            <img 
              src={img_url + product.product_photo} 
              alt={product.product_name}
              className="w-100"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">

              <h5 
                className="fw-bold"
                style={{ color: "#8B0000" }}
              >
                {product.product_name}
              </h5>

              <p className="text-muted flex-grow-1">
                {product.product_description.slice(0, 90)}...
              </p>

              <h4 className="fw-semibold text-dark mb-3">
                KES {product.product_cost}
              </h4>

              <button 
                className="btn mt-auto fw-semibold"
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  borderRadius: "10px"
                }}
                onClick={() => navigate("/makepayment", { state: { product } })}
              >
                🍷 Order Now
              </button>

            </div>
          </div>

        </div>
      ))}

    </div>

  </div>
  <FoodChatbot />
</div>
</>
  );
}
export default GetProducts;
