import "../styles/header.css";
import logo2 from "../public/images/logo1.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header({ profile, setProfile }) {
  function handleRegister() {
    window.location.href = "/register";
  }
  const handleProfile = () => {
    localStorage.setItem("profile", "profile");
    setProfile("profile");
  };

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="main-header">
      <div className="logo-container">
        <img src={`${logo2}`} className="logo" style={{ width: "40px" }} />
        <span>myJournals</span>
      </div>
      <nav>
        {user && (
          <div className="logout-div">
            <span>{user.email}</span>
            <span
              className="profile"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "gray",
                borderRadius: "50%",
                padding: "6px 15px",
                margin: "10px",
              }}
              onClick={handleProfile}
            ></span>
            <button onClick={handleClick} className="logout">
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div className="action-buttons">
            <Link to="/login">login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
