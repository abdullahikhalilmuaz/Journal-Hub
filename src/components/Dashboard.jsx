import React from "react";
import "../styles/dashboard.css";

export default function Dashboard({ setProfile, profile }) {
  const handleProfile = () => {
    localStorage.clear("profile");
    localStorage.setItem("profile", "profile");
    setProfile("profile");
  };

  const setEvent = () => {
    setShowComponent("event");
  };
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome to the Research Hub</h1>
        <p>
          Enhancing Research Accessibility Across Nigerian Tertiary Institutions
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Total Journals</h3>
          <p>1,250</p>
          <span>📚</span>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>5,000+</p>
          <span>👥</span>
        </div>
        <div className="stat-card">
          <h3>New Articles</h3>
          <p>120</p>
          <span>📄</span>
        </div>
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>15</p>
          <span>📅</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>
              New journal added:{" "}
              <strong>Journal of Science and Technology</strong>
            </li>
            <li>
              User <strong>John Doe</strong> rated{" "}
              <strong>Journal of Education</strong> 5 stars
            </li>
            <li>
              New article published:{" "}
              <strong>Advancements in Renewable Energy</strong>
            </li>
            <li>
              Upcoming webinar: <strong>AI in Academic Research</strong> on
              October 30th
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h2>Quick Links</h2>
          <div className="links-grid">
            <a href="/journals" className="link-card">
              <span>📚</span>
              <p>Explore Journals</p>
            </a>
            <a href="/submit" className="link-card">
              <span>📝</span>
              <p>Submit Your Work</p>
            </a>
            <a className="link-card" onClick={setEvent}>
              <span>📅</span>
              <p>View Events</p>
            </a>
            <a onClick={handleProfile} className="link-card">
              <span>👤</span>
              <p>Your Profile</p>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <p>© 2023 Research Hub. All rights reserved.</p>
        {console.log(profile)}{" "}
      </div>
    </div>
  );
}
