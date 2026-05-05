import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import FoodChatbot from "../components/FoodChatbot";
import Carousel from "./Carousel";

const GetProducts = () => { 

  // the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // products state
  const [products, setProducts] = useState([]);

  // cart state
  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error , setError] = useState("");

  const navigate = useNavigate();

  // to add a message after adding an item in a cart
  const [cartMessage, setCartMessage] = useState("");

  // to add cart
  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

// one can order when signed in
    if(!user){
      alert("Please sign in to add items to cart");
      navigate("/signin");
    }

  setCart((prevCart) => {
    const existing = prevCart.find(
      item => item.product_id === product.product_id
    );

    if (existing) {
      return prevCart.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prevCart, { ...product, quantity: 1 }];
  });
  // ✅ show message
  setCartMessage(`${product.product_name} added to cart ✔️`);

  // auto hide after 3 seconds
  setTimeout(() => {
    setCartMessage("");
  }, 3000);
};

  //  increase quantity
  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.product_id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // decrease quantity
  const decreaseQty = (id) => {
    setCart(cart
      .map(item =>
        item.product_id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0)
  );
};

  // remove item
  const removeItem = (id) => {
  setCart(cart.filter(item => item.product_id !== id));
};

  // total price
  const total = cart.reduce(
    (sum, item) => sum + (item.product_cost * item.quantity),
    0
  );

  const img_url = "https://victoria.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://victoria.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // order now
  const handleOrderNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // one must sign in to order
    if (!user){
      alert("You must sign in to place an order");
      navigate("/signin");
      return;
    }

    // one must add at least one item to order
    if (cart.length === 0) {
      alert("Please add at least one item to cart");
      return;
    }

    navigate("/reserve", { state: { cart } });
  };
  

  return (
    <>
      <Carousel />

      {/* added to cart message decor */}
      {cartMessage && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#28a745",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      zIndex: 1000,
      animation: "fadeInOut 3s ease-in-out"
    }}
  >
    {cartMessage}
  </div>
  
)}

      <div 
        className="container-fluid py-5"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <div style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: "30px", borderRadius: "20px" }}>

          {/* search */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search for a delicacy..."
                style={{ borderRadius: "20px", padding: "12px 20px" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <h2 className="text-center mb-5" style={{ color: "#8B0000" }}>
            🍽️ Available Delicacies
          </h2>

          {/* cart message */}
          {cartMessage && (
            <div className="alert alert-success text-center">
              {cartMessage}
              
            </div>
)}

          {/* cart: This is the array (list) of objects representing the products a user has added to their 
          cart..reduce(): This is a powerful array method used to "boil down" an entire list into a single value (in this case, a total sum).
          (sum, item) => sum + item.quantity: This is the "accumulator" logic.
          sum: Keeps track of the running total.
          item: Represents the current product the code is looking at as it loops through the list.It adds that specific item's quantity to the running sum., 
          0: This tells the code to start counting at zero. Without this, the calculation might break if the cart is empty. */}
          <p className="text-center fw-bold">
             Cart Items: {cart.reduce((sum , item) => sum + item.quantity, 0)}
          </p>

          {loading && <Loader />}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="row g-4">
            {filterProducts.map((product) => (
              <div className="col-md-3" key={product.product_id}>
                <div className="card h-100 shadow">

                  <img 
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h4>{product.product_name}</h4>
                    <h6>{product.category}</h6>
                    <p>{product.product_description.slice(0, 80)}...</p>
                    <h6 className = 'brown'>KES {product.product_cost}</h6>

                    <button
                    className="btn btn-lg rounded-3 fw-semibold"
                    style={{
                      backgroundColor: "#de9d9f",
                      color: "black"
                      }}
                      onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*CART DISPLAY */}
          <div className="mt-5">
            <h4>Your Cart</h4>

            {cart.length === 0 ? (
              <p>No items added</p>
            ) : (
              cart.map((item) => (
                <div key={item.product_id} className="d-flex justify-content-between align-items-center mb-2">

                  <div>
                    <strong>{item.product_name}</strong><br />
                    KES {item.product_cost}
                  </div>

                  <div>
                    <button onClick={() => decreaseQty(item.product_id)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.product_id)}>+</button>
                  </div>

                  <button onClick={() => removeItem(item.product_id)}>
                    🗑️
                  </button>

                </div>
              ))
            )}

            <h5>Total: KES {total}</h5>
          </div>

          {/* ORDER BUTTON */}
          <div className="d-grid mb-3">
            <button 
            className="btn btn-lg rounded-3 fw-semibold"
            style={{
              backgroundColor: "#8B0000",
              color: "white"
            }} onClick={handleOrderNow}>
              🍷 Order Now</button>

          
      
        </div>
        </div>

        <FoodChatbot />
      </div>
    </>
  );
};

export default GetProducts;