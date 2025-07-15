import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/institutionSingle.css";

export default function InstitutionSingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("journals");

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/institution-profile?institutionId=${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setInstitution(data.data);
        } else {
          setError(data.message || "Failed to fetch institution");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  if (loading) {
    return (
      <div className="institution-single-loading">
        <div className="loading-spinner"></div>
        <p>Loading institution data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="institution-single-error">
        {error}
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="institution-single-error">Institution not found</div>
    );
  }

  return (
    <div className="institution-single-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Institutions
      </button>

      <div className="institution-header">
        <div className="institution-logo">
          {institution.logo ? (
            <img src={institution.logo} alt={`${institution.name} logo`} />
          ) : (
            <div className="logo-placeholder">
              {institution.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="institution-title">
          <h1>{institution.name}</h1>
          <p className="institution-website">
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {institution.website || "No website"}
            </a>
          </p>
        </div>
      </div>

      <div className="institution-tabs">
        <button
          className={activeTab === "journals" ? "active" : ""}
          onClick={() => setActiveTab("journals")}
        >
          Journals ({institution.journals?.length || 0})
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={activeTab === "contact" ? "active" : ""}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
      </div>

      <div className="institution-content">
        {activeTab === "journals" && (
          <div className="journals-section">
            {institution.journals?.length > 0 ? (
              <div className="journals-grid">
                {institution.journals.map((journal) => (
                  <div key={journal._id} className="journal-card">
                    <h3>{journal.title}</h3>
                    <p className="journal-meta">
                      <span>
                        {new Date(journal.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`status ${journal.status}`}>
                        {journal.status}
                      </span>
                    </p>
                    <p className="journal-abstract">
                      {journal.abstract || "No abstract available"}
                    </p>
                    <button className="view-button">View Journal</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-journals">
                <p>This institution hasn't published any journals yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-section">
            <h2>About {institution.name}</h2>
            <p>{institution.description || "No description available."}</p>
            <div className="institution-details">
              <h3>Details</h3>
              <div className="detail-item">
                <span className="detail-label">Established:</span>
                <span>{institution.established || "Unknown"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span>{institution.location || "Unknown"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span>{institution.type || "Academic Institution"}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-section">
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span>{institution.contactEmail || "No email provided"}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <span>{institution.phone || "No phone provided"}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Address:</span>
                <span>{institution.address || "No address provided"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
