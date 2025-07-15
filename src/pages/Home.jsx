import { useState } from "react";
import "../styles/home.css";
import DocumentEdit from "../components/DocumentEdit";
import Journals from "../components/Journals";
import Collaborate from "../components/Collaborate";
import Dashboard from "../components/Dashboard";
import Guide from "../components/Guide";
import Archive from "../components/Archive";
import Submission from "../components/Submission";
import News from "../components/News";
import Profile from "../components/Profile";
import Events from "../components/Events";
import NewPost from "../components/NewPost";
import Institutions from "../components/Institutions";
import InstitutionProfile from "../components/Institutions";

export default function Home({
  showComponent,
  setShowComponent,
  profile,
  setProfile,
}) {
  const [showNew, setShowNew] = useState("");
  const [show, setShow] = useState(null);
  const saved = localStorage;
  console.log(saved);

  // Dashboard handler
  function handleDashboard() {
    setShowComponent("dashboard");
    localStorage.removeItem("journals");
    localStorage.removeItem("document");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("dashboard", "dashboard");
  }

  // Journals handler
  function handleJournals() {
    setShowComponent("journals");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("journals", "journals");
  }

  // Document handler
  function handleDocument() {
    setShowComponent("document");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("journals");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("document", "document");
  }

  // News handler
  function handleNews() {
    setShowComponent("news");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("news", "news");
  }

  // Events handler
  function handleEvents() {
    setShowComponent("events");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("events", "events");
  }

  // Collaborate handler
  function handleCollaborate() {
    setShowComponent("collaborate");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("collaborate", "collaborate");
  }

  // Fixed: Institutions handler (was labeled as Archive handler)
  function handleInstitutions() {
    setShowComponent("institutions");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("guide");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("collaborate"); // Added missing removal
    localStorage.setItem("institutions", "institutions");
  }

  // Guide handler
  function handleGuide() {
    setShowComponent("guide");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("archive");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("guide", "guide");
  }

  // Submit handler
  function handleSubmit() {
    setShowComponent("submit");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("document");
    localStorage.removeItem("journals");
    localStorage.removeItem("archive");
    localStorage.removeItem("guide");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("submit", "submit");
  }

  // New Post handler
  function handleNewPost() {
    setShowComponent("new");
    localStorage.removeItem("journals");
    localStorage.removeItem("document");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("newPost", "newPost");
  }

  // Fixed: Renamed from handleInstitutes to handleInstitutions for consistency
  function handleInstitutes() {
    setShowComponent("institutes");
    localStorage.removeItem("journals");
    localStorage.removeItem("document");
    localStorage.removeItem("collaborate");
    localStorage.removeItem("submit");
    localStorage.removeItem("news");
    localStorage.removeItem("events");
    localStorage.removeItem("institutions"); // Fixed: consistent naming
    localStorage.setItem("institutes", "institutes");
  }

  return (
    <div className="container">
      <div className="nav">
        {/* Journals Section */}

        {/* New Post and News Icons */}
        <div
          className="link"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px 10px",
            fontWeight: "900",
            justifyContent: "space-between",
          }}
        >
          <div
            className="nav-childs"
            style={{ fontWeight: "700" }}
            onClick={handleJournals}
          >
            Journals
          </div>
          <div
            className="nav-childs"
            style={{ fontWeight: "700" }}
            onClick={handleInstitutes}
          >
            Institutes
          </div>
          <div onClick={handleNewPost} className="nav-childs">
            +Post
          </div>
          <div onClick={handleNews} className="nav-childs">
            News
          </div>
          <div onClick={handleEvents} className="nav-childs">
            Events
          </div>
        </div>
      </div>

      <div className="content">
        <div className="sidenav">
          <div onClick={handleDashboard}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="2" />
              <rect x="14" y="3" width="7" height="5" rx="2" />
              <rect x="14" y="12" width="7" height="9" rx="2" />
              <rect x="3" y="16" width="7" height="5" rx="2" />
            </svg>
            <span>Dashboard</span>
          </div>

          {/* Fixed: Changed onClick from Institutions to handleInstitutions */}
          <div onClick={handleInstitutions}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4" />
              <path d="M7 4V2h10v2" />
              <path d="M12 10H8" />
              <path d="M16 14H8" />
              <path d="M16 18H8" />
            </svg>
            <span>Institutions</span>
          </div>

          <div onClick={handleDocument}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="2" />
              <rect x="14" y="3" width="7" height="5" rx="2" />
              <rect x="14" y="12" width="7" height="9" rx="2" />
              <rect x="3" y="16" width="7" height="5" rx="2" />
            </svg>
            <span>Document</span>
          </div>

          <div onClick={handleCollaborate}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="9" r="5" />
              <circle cx="15" cy="9" r="5" />
              <circle cx="12" cy="15" r="5" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="9" x2="12" y2="15" />
              <line x1="15" y1="9" x2="12" y2="15" />
            </svg>
            <span>Collaborate</span>
          </div>

          <div onClick={handleGuide}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="2" />
              <rect x="14" y="3" width="7" height="5" rx="2" />
              <rect x="14" y="12" width="7" height="9" rx="2" />
              <rect x="3" y="16" width="7" height="5" rx="2" />
            </svg>
            <span>Guides</span>
          </div>

          <div onClick={handleSubmit}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="2" />
              <rect x="14" y="3" width="7" height="5" rx="2" />
              <rect x="14" y="12" width="7" height="9" rx="2" />
              <rect x="3" y="16" width="7" height="5" rx="2" />
            </svg>
            <span>Submit</span>
          </div>
        </div>

        {/* Main Content */}
        {localStorage.getItem("dashboard") && showComponent === "dashboard" ? (
          <Dashboard
            setProfile={setProfile}
            profile={profile}
            setShowComponent={setShowComponent}
          />
        ) : localStorage.getItem("document") && showComponent === "document" ? (
          <DocumentEdit />
        ) : localStorage.getItem("institutions") && // Fixed: lowercase 'institutions'
          showComponent === "institutions" ? (
          <InstitutionProfile />
        ) : localStorage.getItem("guide") && showComponent === "guide" ? (
          <Guide />
        ) : localStorage.getItem("collaborate") &&
          showComponent === "collaborate" ? (
          <Collaborate />
        ) : localStorage.getItem("journals") && showComponent === "journals" ? (
          <Journals />
        ) : localStorage.getItem("submit") && showComponent === "submit" ? (
          <Submission />
        ) : localStorage.getItem("news") && showComponent === "news" ? (
          <News showNew={showNew} />
        ) : localStorage.getItem("events") && showComponent === "events" ? (
          <Events />
        ) : localStorage.getItem("profile") && profile === "profile" ? (
          <Profile />
        ) : localStorage.getItem("institutes") &&
          showComponent === "institutes" ? (
          <Institutes />
        ) : localStorage.getItem("newPost") && showComponent === "new" ? (
          <NewPost />
        ) : localStorage.getItem("events") && show === "event" ? (
          <Events />
        ) : (
          <Dashboard
            setProfile={setProfile}
            profile={profile}
            setShowComponent={setShowComponent}
          />
        )}
        {console.log(showComponent)}
      </div>
    </div>
  );
}
