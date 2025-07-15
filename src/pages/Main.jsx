import { Link } from "react-router-dom";
import "../styles/main.css";
import Header from "../components/Header";
import image1 from "../public/images/logo3.png";
export default function App() {
  function handleRegister() {
    // window.location.href = "login";
    window.alert("try signing up!");
  }
  const save = localStorage.getItem("institution");
  return (
    <>
      <div>
        <div className="hero-image">
          <div className="content">
            <h3>All Journals in one place</h3>
            <Link to="signup">Get Started</Link>
          </div>
        </div>

        <div className="description">
          <h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            suscipit commodi dolores deserunt dolor maiores porro magni. Et
            aperiam laudantium id, repellendus deserunt accusantium ab
            laboriosam ex ipsa nulla? Eius?
          </h3>
        </div>

        <div className="advert">
          <h1>Top Rated Journals</h1>
          <div className="rating-div">
            <div
              className="rate-star"
              style={{
                display: "flex",
                marginLeft: "-80px",
                cursor: "pointer",
              }}
            >
              <div>★</div>
              <div>★</div>
              <div>★</div>
              <div>★</div>
              <div>★</div>
            </div>{" "}
            {/* 5-star rating */}
          </div>

          <img
            src={`${image1}`}
            style={{ width: "80px", height: "70px", marginLeft: "30px" }}
          />
          <h3>
            Find the top most rated journals by researchers and institutions
          </h3>
        </div>

        <div className="footer">
          <h1>Footer</h1>
        </div>
      </div>
    </>
  );
}
