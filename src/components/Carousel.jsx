import React from "react";

function Carousel() {
  return (
    <div className="container-fluid p-0">

      <div
        id="foodCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >

        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>

          <button
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide-to="1"
          ></button>

          <button
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">

            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947"
              className="d-block w-100"
              alt="Delicious meals"
              style={{
                height: "70vh",
                objectFit: "cover"
              }}
            />

            <div
              className="carousel-caption d-block"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "20px",
                borderRadius: "15px"
              }}
            >

              <h1
                style={{
                  fontFamily: "serif",
                  color: "#FFD700"
                }}
              >
                🍽️ Taste the Finest Delicacies
              </h1>

              <p style={{ color: "white" }}>
                Experience luxury dining at your fingertips
              </p>

            </div>

          </div>

          {/* Slide 2 */}
          <div className="carousel-item">

            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              className="d-block w-100"
              alt="Chef special"
              style={{
                height: "70vh",
                objectFit: "cover"
              }}
            />

            <div
              className="carousel-caption d-block"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "20px",
                borderRadius: "15px"
              }}
            >

              <h1
                style={{
                  fontFamily: "serif",
                  color: "#FFD700"
                }}
              >
                🍝 Chef's Special Dishes
              </h1>

              <p style={{ color: "white" }}>
                Fresh ingredients, unforgettable flavors
              </p>

            </div>

          </div>

          {/* Slide 3 */}
          <div className="carousel-item">

            <img
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777"
              className="d-block w-100"
              alt="Luxury desserts"
              style={{
                height: "70vh",
                objectFit: "cover"
              }}
            />

            <div
              className="carousel-caption d-block"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "20px",
                borderRadius: "15px"
              }}
            >

              <h1
                style={{
                  fontFamily: "serif",
                  color: "#FFD700"
                }}
              >
                🍰 Sweet Moments Await
              </h1>

              <p style={{ color: "white" }}>
                Indulge in desserts crafted with love
              </p>

            </div>

          </div>

        </div>

        {/* Controls */}

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#foodCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#foodCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

    </div>
  );
}

export default Carousel;