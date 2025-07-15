import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { changeAppLanguage } from "./i18n"; // Import the function

export default function App() {
  const [showComponent, setShowComponent] = useState("document");
  const [profile, setProfile] = useState("");

  const save = localStorage.getItem("institution");

  return (
    <BrowserRouter>
      <Header setProfile={setProfile} profile={profile} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/home"
            element={
              <Home
                showComponent={showComponent}
                setShowComponent={setShowComponent}
                setProfile={setProfile}
                profile={profile}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
