import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/institute.css";

export default function Institute() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch(
          "https://journal-hub-server.onrender.com/api/institutions"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch institutes");
        }
        const data = await response.json();
        setInstitutes(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const handleViewDetails = (institute) => {
    setSelectedInstitute(institute);
    setShowModal(true);
  };

  const handleSubmitJournal = (instituteId) => {
    navigate(`/submit-journal/${instituteId}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">Error loading institutes: {error}</div>
    );
  }

  return (
    <div className="institute-container">
      {institutes.length === 0 ? (
        <div className="no-institutes">
          <p>No institutions found.</p>
        </div>
      ) : (
        <div className="institute-grid">
          {institutes.map((institute) => (
            <div key={institute._id} className="institute-card">
              {institute.logo && (
                <div className="institute-logo-container">
                  <img
                    src={institute.logo}
                    alt={`${institute.name} logo`}
                    className="institute-logo"
                  />
                </div>
              )}
              <div className="institute-card-body">
                <h2 className="institute-name">{institute.name}</h2>
                <p className="institute-bio">
                  {institute.bio
                    ? institute.bio.substring(0, 100) + "..."
                    : "No description available"}
                </p>
              </div>
              <div className="institute-card-footer">
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(institute)}
                >
                  View Details
                </button>
                <button
                  className="submit-journal-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(institute._id);
                    alert("Institute ID copied to clipboard!");
                  }}
                >
                  Copy ID
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Institute Details Modal */}
      {showModal && selectedInstitute && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedInstitute.name}</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-left">
                  {selectedInstitute.logo && (
                    <img
                      src={selectedInstitute.logo}
                      alt={`${selectedInstitute.name} logo`}
                      className="modal-logo"
                    />
                  )}
                  <ul className="institute-details-list">
                    <li>
                      <strong>ID:</strong> {selectedInstitute._id}
                    </li>
                    <li>
                      <strong>Email:</strong> {selectedInstitute.email}
                    </li>
                    <li>
                      <strong>Contact Email:</strong>{" "}
                      {selectedInstitute.contactEmail || "Not provided"}
                    </li>
                    <li>
                      <strong>Website:</strong>
                      {selectedInstitute.website ? (
                        <a
                          href={selectedInstitute.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedInstitute.website}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </li>
                    <li>
                      <strong>Accreditation Number:</strong>{" "}
                      {selectedInstitute.accreditationNumber}
                    </li>
                  </ul>
                </div>
                <div className="modal-right">
                  <h3>About</h3>
                  <p>{selectedInstitute.bio || "No description available."}</p>

                  <h3>Journals Hosted</h3>
                  <p>{selectedInstitute.journals?.length || 0} journals</p>

                  <h3>Pending Payments</h3>
                  {selectedInstitute.pendingPayments?.length > 0 ? (
                    <ul className="payments-list">
                      {selectedInstitute.pendingPayments.map(
                        (payment, index) => (
                          <li key={index}>
                            {payment.description}: ${payment.amount} -
                            {payment.isPaid
                              ? " Paid"
                              : ` Due by ${new Date(
                                  payment.dueDate
                                ).toLocaleDateString()}`}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>No pending payments</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="submit-journal-btn"
                onClick={() => handleSubmitJournal(selectedInstitute._id)}
              >
                Submit Journal to This Institute
              </button>
              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
