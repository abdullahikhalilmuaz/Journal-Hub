// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// // import { changeAppLanguage } from "../i18n"; // Import function
// import "../styles/profile.css";

// export default function Profile() {
//   const { t, i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState(
//     localStorage.getItem("language") || "en"
//   );

//   // Handle language change
//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setSelectedLanguage(newLanguage);
//     changeAppLanguage(newLanguage); // Updates globally
//   };

//   return (
//     <div className="profile-container">
//       <h1>{t("profileTitle")}</h1>
//       <div className="profile-card">
//         <img
//           src="/default-avatar.png"
//           alt="Profile"
//           className="profile-avatar"
//         />
//         <h2>John Doe</h2>
//         <p>Email: johndoe@example.com</p>

//         <div className="language-selector">
//           <label>{t("selectLanguage")}:</label>
//           <select value={selectedLanguage} onChange={handleLanguageChange}>
//             <option value="en">English</option>
//             <option value="ha">Hausa</option>
//             <option value="ig">Igbo</option>
//             <option value="yo">Yoruba</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Profile() {
  return (
    <div
      style={{
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <h1>Hello and welcome, this is the profile component</h1>
    </div>
  );
}
