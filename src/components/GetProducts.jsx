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

  // to add cart
  const addToCart = (product) => {
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
    if (cart.length === 0) {
      alert("Please add at least one item to cart");
      return;
    }

    navigate("/reserve", { state: { cart } });
  };

  return (
    <>
      <Carousel />

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

          <p className="text-center fw-bold">
             Cart Items: {cart.length}
          </p>

          {loading && <Loader />}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="row g-4">
            {filterProducts.map((product) => (
              <div className="col-md-3" key={product.id}>
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
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">

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