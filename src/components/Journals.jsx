import { useState, useEffect } from "react";
import "../styles/journals.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePdf, FaFileWord } from "react-icons/fa"; // Icons for PDF and DOCX
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Recharts for pie chart
import { StateUniversities } from "../../../../college/server/StateUniversities";

const API_BASE_URL = "http://localhost:5000/api/journals";

export default function Journals() {
  const [search, setSearch] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [showRating, setShowRating] = useState(false); // State to control rating component visibility
  const [rating, setRating] = useState(0); // State to store user's rating
  const [review, setReview] = useState(""); // State to store review comment
  const [metrics, setMetrics] = useState(null); // State to store metrics data

  // Fetch all journals
  const fetchJournals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch journals.");
      }
      const data = await response.json();
      setJournals(data);
      setFilteredJournals(data); // Initialize filtered journals with all journals
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch journals on component mount
  useEffect(() => {
    fetchJournals();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let filtered = journals;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (journal) =>
          journal.name.toLowerCase().includes(search.toLowerCase()) ||
          journal.author.toLowerCase().includes(search.toLowerCase()) ||
          journal.institution.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (journal) => journal.category === selectedCategory
      );
    }

    // Filter by institution
    if (selectedInstitution) {
      filtered = filtered.filter(
        (journal) => journal.institution === selectedInstitution
      );
    }

    setFilteredJournals(filtered);
  }, [search, selectedCategory, selectedInstitution, journals]);

  // Toggle header visibility
  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  // Handle file view/download
  const handleFileClick = async (fileUrl, journalId) => {
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    if (fileExtension === "pdf") {
      window.open(fileUrl, "_blank"); // Open PDF in a new tab
    } else if (fileExtension === "docx") {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.split("/").pop(); // Download DOCX file
      link.click();
    } else {
      toast.error("Unsupported file format.");
    }

    // Increment views when the file is viewed/downloaded
    try {
      await fetch(`${API_BASE_URL}/${journalId}/increment-views`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to increment views:", error);
    }
  };

  // Handle view journal details
  const handleViewJournal = async (journal) => {
    setSelectedJournal(journal);
    setShowRating(false); // Hide rating component when viewing a new journal

    // Fetch metrics for the selected journal
    try {
      const response = await fetch(`${API_BASE_URL}/${journal._id}/metrics`);
      if (!response.ok) {
        throw new Error("Failed to fetch metrics.");
      }
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle rating submission
  const handleRateJournal = async () => {
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/${selectedJournal._id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            comment: review,
            user: "Current User",
          }), // Include review and user
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit rating and review.");
      }

      toast.success("Rating and review submitted successfully!");
      setShowRating(false); // Hide rating component after submission
      setReview(""); // Clear review input
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return "Not yet rated";
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // Pie chart data for metrics
  const pieChartData = metrics
    ? [
        { name: "Views", value: metrics.views },
        { name: "Downloads", value: metrics.downloads },
        { name: "Citations", value: metrics.citations },
      ]
    : [];

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="journals-container">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header */}
      {isHeaderVisible && (
        <div className="journal-header">
          <input
            type="text"
            placeholder="Search Journal..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Science">Science</option>
            <option value="Education">Education</option>
            <option value="Languages">Languages</option>
          </select>
          <select
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
          >
            {StateUniversities.map((universities) => (
              <>
                <option value="">All Institutions</option>
                <option value={`${universities.name}`}>
                  {universities.name}
                </option>
              </>
            ))}
          </select>
          <button className="filter-button" onClick={fetchJournals}>
            Refresh
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="journal-header-nav">
        <button
          className="toggle-header-button"
          onClick={toggleHeaderVisibility}
        >
          {isHeaderVisible ? "Hide Header" : "Show Header"}
        </button>
        <button className="nav-button">Institutions Journals</button>
      </div>

      {/* Content */}
      <div className="journals-content">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : filteredJournals.length > 0 ? (
          <div className="journal-list">
            {filteredJournals.map((journal) => (
              <div key={journal._id} className="journal-card">
                <h3>{journal.name}</h3>
                <p>
                  <strong>Author:</strong> {journal.author}
                </p>
                <p>
                  <strong>Institution:</strong> {journal.institution}
                </p>
                <p>
                  <strong>Category:</strong> {journal.category}
                </p>
                <p>
                  <strong>Publication Frequency:</strong>{" "}
                  {journal.publicationFrequency}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {calculateAverageRating(journal.ratings || [])}
                </p>
                <button
                  className="view-journal-button"
                  onClick={() => handleViewJournal(journal)}
                >
                  View Journal
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No journals found.</p>
        )}

        {/* Journal Details */}
        {selectedJournal && (
          <div className="journal-details">
            <h3>{selectedJournal.name}</h3>
            <p>
              <strong>Author:</strong> {selectedJournal.author}
            </p>
            <p>
              <strong>Institution:</strong> {selectedJournal.institution}
            </p>
            <p>
              <strong>Category:</strong> {selectedJournal.category}
            </p>
            <p>
              <strong>Publication Frequency:</strong>{" "}
              {selectedJournal.publicationFrequency}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {calculateAverageRating(selectedJournal.ratings || [])}
            </p>
            <button
              className="file-button"
              onClick={() =>
                handleFileClick(selectedJournal.fileUrl, selectedJournal._id)
              }
            >
              {selectedJournal.fileUrl.endsWith(".pdf") ? (
                <FaFilePdf className="file-icon" />
              ) : (
                <FaFileWord className="file-icon" />
              )}
              {selectedJournal.fileUrl.endsWith(".pdf")
                ? "View PDF"
                : "Download DOCX"}
            </button>

            {/* Rate Button */}
            <button className="rate-button" onClick={() => setShowRating(true)}>
              Rate Journal
            </button>

            {/* Rating Component */}
            {showRating && (
              <div className="rating-component">
                <h4>Rate this Journal</h4>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  placeholder="Write your review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="review-input"
                />
                <button
                  className="submit-rating-button"
                  onClick={handleRateJournal}
                >
                  Submit Rating and Review
                </button>
              </div>
            )}

            {/* Metrics Section */}
            <div className="metrics-section">
              <h4>Metrics</h4>
              {metrics ? (
                <PieChart width={400} height={300}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <p>Loading metrics...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
