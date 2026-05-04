import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReservationTimer from "../components/ReservationTimer";

const ReservationPage = () => {

  // receive data from previous page (Order Now button)
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  //reservation-null , setReservation - is the only function allowed to update that memory
  const [reservation, setReservation] = useState(null);

//   to create random IDs so that the restaurant know its you - a timer is also added of 15 min
  const generateCode = () => {
    return "BB-" + Math.floor(1000 + Math.random() * 9000);
  };

//   onclicking the button , a table number and your code saves in setReservation
  const handleReservation = () => {   
    const newReservation = {
      tableNumber: Math.floor(Math.random() * 10) + 1, // simple demo
      code: generateCode(),
      timeLeft: 900, // 15 minutes in seconds
    };

    setReservation(newReservation);
  };

  return (
    <div>
      <h2
      style={{marginTop: "100px", marginBottom:"20px"}}> Reserve Your Table</h2>
      
      
            {!reservation ? (
        <button 
        className="btn btn-lg rounded-3 fw-semibold"
          style={{
            backgroundColor: "#008b38",
            color: "white",
            marginBottom:"100px",}}        
        onClick={handleReservation}>
            {/*if no order  */}
          Pre-Order & Reserve Table
        </button>
      ) : (
        <div>
          <p>Table: {reservation.tableNumber}</p>
          <p>Code: {reservation.code}</p>

          {/* timer */}
          <ReservationTimer
            timeLeft={reservation.timeLeft}
            onExpire={() => setReservation(null)}
          />

          {/* go to payment with both cart + reservation */}
          <button
          className="btn btn-lg rounded-3 fw-semibold"
          style={{
            backgroundColor: "#008b38",
            color: "white"
            }}
            onClick={() =>
              navigate("/makepayment", {
                state: { cart, reservation },
              })
            }
          >
            Proceed to Payment
          </button>
          <br></br>
          <button
          className="btn btn-lg rounded-3 fw-semibold"          
          style={{
            marginTop: "10px",
            backgroundColor: "rgba(252, 0, 0, 0.53)",
            color: "white",
          }}
            
            onClick={() => {
            setReservation(null);
            }}>Cancel Reservation
            </button>
                
        </div>
      )}
    </div>
  );
};

export default ReservationPage;