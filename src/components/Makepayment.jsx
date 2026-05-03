import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {

    // destructure the details passed from previous component
    const location = useLocation();
    const { product, cart = [], reservation } = location.state || {};

    // declare the navigate hook
    const navigate = useNavigate()

    // below we specify the image base url
    const img_url = "https://victoria.alwaysdata.net/static/images/"

    // initialize hooks
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // ✅ calculate total (works for both product + cart)
    const total = cart.length > 0
        ? cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0)
        : product?.product_cost;

    // create a function that will handle the submit action
    const handlesubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)

        try{
            const formdata = new FormData()
            formdata.append("phone", number)
            formdata.append("amount", total)

            const response = await axios.post("https://victoria.alwaysdata.net/api/mpesa_payment", formdata)

            setLoading(false)
            setSuccess(response.data.message)
        }
        catch(error){
            // if there is an error respond to error
            setLoading(false)
            setError(error.message)
        }
    }

  return (
    <div className='row justify-content-center'>

        <h2 className="text-success">Make Payment - Lipa na M-Pesa</h2>

        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back"
            onClick={() => navigate("/") } />
        </div>

        <div className="col-md-6 card shadow p-4">

            {/* ✅ SINGLE PRODUCT (fallback) */}
            {product && (
                <>
                    <img src={img_url + product.product_photo} alt="Product name" className='product_img'/>

                    <div className="card-body ">
                        <h2 className="text-info"> {product.product_name} </h2>
                        <p className="text-dark"> {product.product_description} </p>
                        <h3 className="text-warning">Kes {product.product_cost} </h3>
                    </div>
                </>
            )}

            {/* ✅ MULTIPLE ITEMS (cart) */}
            {cart.length > 0 && (
                <div className="card-body">
                    <h4 className="text-primary">Your Order</h4>

                    {cart.map((item, index) => (
                        <div key={index} className="mb-3">
                            <img
                                src={img_url + item.product_photo}
                                alt={item.product_name}
                                style={{ width: "80px" }}
                            />
                            <p>{item.product_name} × {item.quantity}</p>
                            <p>KES {item.product_cost}</p>
                        </div>
                    ))}

                    <h3 className="text-warning">Total: KES {total}</h3>
                </div>
            )}

            {/* ✅ RESERVATION INFO */}
            {reservation && (
                <div className="mb-3">
                    <p>Table: {reservation.tableNumber}</p>
                    <p>Code: {reservation.code}</p>
                </div>
            )}

            <div className="card-body ">

                <form onSubmit={handlesubmit}>

                    {loading && <Loader />}

                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>

                    <input
                        type="number"
                        className='form-control'
                        placeholder='Enter the Phone number 254XXXXXXX'
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    /> 
                    <br />

                    <input
                        type="submit"
                        value="Make Payment"
                        className='btn btn-success'
                    />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Makepayment;