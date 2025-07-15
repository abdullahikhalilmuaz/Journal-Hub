import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const datasss = [
  {
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [],
    _id: "67ca782a126af3447f83df5e",
    name: "University of Lgs",
    email: "unilag@edu.ng",
    accreditationNumber: "NUC12345",
    __v: 0,
    pendingPayments: [],
    createdAt: "2025-07-12T16:40:12.405Z",
    updatedAt: "2025-07-12T16:40:12.405Z",
  },
  {
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [],
    _id: "67ca7d7d126af3447f83df67",
    name: "Federal",
    email: "abdullahi@gmail.com",
    accreditationNumber: "nuc123",
    __v: 0,
    pendingPayments: [],
    createdAt: "2025-07-12T16:40:12.405Z",
    updatedAt: "2025-07-12T16:40:12.405Z",
  },
  {
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [],
    _id: "67cbe933ff5ca60975e71baa",
    name: "Federal College of Education Katsina",
    email: "fcekatsina@email.com",
    accreditationNumber: "NUC@1234",
    __v: 0,
    pendingPayments: [],
    createdAt: "2025-07-12T16:40:12.405Z",
    updatedAt: "2025-07-12T16:40:12.405Z",
  },
  {
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [],
    _id: "67fbec51524cb18b152a414f",
    name: "school",
    email: "school@gmail.com",
    accreditationNumber: "1234",
    __v: 0,
    pendingPayments: [],
    createdAt: "2025-07-12T16:40:12.405Z",
    updatedAt: "2025-07-12T16:40:12.405Z",
  },
  {
    _id: "683c250cf6a31f7c40ad339d",
    name: "school",
    email: "school@email.com",
    accreditationNumber: "0123",
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [
      "68460c3f30e32800d0b706a7",
      "68460beb30e32800d0b706a4",
      "68460982e8b0ca88a1b05cb0",
    ],
    pendingPayments: [],
    createdAt: "2025-06-01T10:01:48.371Z",
    updatedAt: "2025-06-01T10:01:48.371Z",
    __v: 0,
  },
  {
    _id: "683d34d676260b9133b07d77",
    name: "College",
    email: "college@gmail.com",
    accreditationNumber: "7368",
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    journals: [
      "685677c0a872a04f2afa06c9",
      "686185524afcf2f45bc40e84",
      "6869a3173458eb558534a81f",
    ],
    pendingPayments: [],
    createdAt: "2025-06-02T05:21:26.411Z",
    updatedAt: "2025-06-02T05:21:26.411Z",
    __v: 0,
  },
  {
    _id: "6846139bd1f0baa1dec66780",
    name: "Tertiary",
    email: "tertiary@email.com",
    accreditationNumber: "0000",
    bio: "",
    logo: "",
    website: "",
    contactEmail: "",
    description: "",
    journals: ["684613dc30e32800d0b706b0"],
    pendingPayments: [],
    createdAt: "2025-06-08T22:50:03.500Z",
    updatedAt: "2025-06-08T22:50:03.500Z",
    __v: 0,
  },
  {
    _id: "6847f0d77f8b8591b3a04536",
    name: "College Of Education",
    email: "college@email.com",
    accreditationNumber: "0001",
    bio: "Lorem Ipsum Dolor",
    logo: "",
    website: "https://abdullahikhalilmuaz.github.io/BeardsCodes/index.html#",
    contactEmail: "college@email.com",
    passkey: "2TWJ0R1S",
    description: "Lorem Ipsum Dolor for the Description",
    journals: [
      "6861858f4afcf2f45bc40e89",
      "6869a3783458eb558534a824",
      "6869afc83458eb558534a829",
      "686acfe538c1ab760ecdc3d6",
      "686ad4ce38c1ab760ecdc3db",
      "686adda096cd723e8a5d5aff",
    ],
    pendingPayments: [],
    createdAt: "2025-06-10T08:46:15.830Z",
    updatedAt: "2025-06-10T08:46:15.849Z",
    __v: 0,
  },
  {
    _id: "686ca81a2221db0b54d713fb",
    name: "institute",
    email: "institute@email.com",
    accreditationNumber: "0010",
    bio: "Some randon bio",
    logo: "",
    website: "https://abdullahikhalilmuaz.github.io/BeardsCodes/index.html#",
    contactEmail: "institute@email.com",
    passkey: "9668TA3M",
    description: "some randm descriptions ",
    journals: ["686cac66342a31aaac980f0f", "686cb155a4c15f0a2747a496"],
    pendingPayments: [],
    createdAt: "2025-07-08T05:09:46.755Z",
    updatedAt: "2025-07-08T05:09:46.755Z",
    __v: 0,
  },
];

import {
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  Search,
  Filter,
  Users,
  Calendar,
  AlertCircle,
  ArrowLeft,
  MapPin,
  Globe,
  Mail,
  GraduationCap,
} from "lucide-react";
import "../styles/institutions.css";

const InstitutionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  // const [data, setData] = useState();
  const [institution, setInstitution] = useState(null);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchInstitutionData();
  }, [id]);

  const fetchInstitutionData = async () => {
    setData(datasss);
  };

  const handleViewJournal = (fileUrl) => {
    window.open(`http://localhost:5000${fileUrl}`, "_blank");
  };

  // const handleDownloadJournal = (fileUrl, title) => {
  //   const link = document.createElement("a");
  //   link.href = `http://localhost:5000${fileUrl}`;
  //   link.setAttribute(
  //     "download",
  //     title ? `${title.replace(/[^a-z0-9]/gi, "_")}.pdf` : "journal.pdf"
  //   );
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // const getStatusIcon = (status) => {
  //   switch (status) {
  //     case "approved":
  //       return (
  //         <CheckCircle className="status-icon status-approved" size={16} />
  //       );
  //     case "rejected":
  //       return <XCircle className="status-icon status-rejected" size={16} />;
  //     default:
  //       return <Clock className="status-icon status-pending" size={16} />;
  //   }
  // };

  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case "approved":
  //       return "status-approved";
  //     case "rejected":
  //       return "status-rejected";
  //     default:
  //       return "status-pending";
  //   }
  // };

  // const filteredJournals = journals.filter((journal) => {
  //   const matchesSearch =
  //     journal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     journal.author?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter =
  //     filterStatus === "all" || journal.status === filterStatus;
  //   return matchesSearch && matchesFilter;
  // });

  // if (loading) {
  //   return (
  //     <div className="institution-profile-container">
  //       <div className="loading-container">
  //         <div className="loading-spinner"></div>
  //         <p className="loading-text">Loading institution details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="institution-profile-container">
  //       <div className="error-container">
  //         <AlertCircle className="error-icon" size={48} />
  //         <h3 className="error-title">Error loading institution</h3>
  //         <p className="error-message">{error}</p>
  //         <button onClick={() => navigate(-1)} className="back-button">
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!institution) {
  //   return (
  //     <div className="institution-profile-container">
  //       <div className="error-container">
  //         <h3>Institution not found</h3>
  //         <button onClick={() => navigate(-1)} className="back-button">
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  const some = () => {
    console.log(datasss);
  };

  some();

  return (
    <>
      <div className="institution-profile-container">
        {/* Header */}
        <div className="profile-header">
          <button className="back-btn">
            <ArrowLeft size={20} />
            Back to Institutions
          </button>

          <div className="institution-header-content">
            {datasss.map((dt) => (
              <></>
            ))}
          </div>
        </div>

        {datasss.map((dt) => (
          <>
            <div className="institution-details">
              <h1 className="institution-name" style={{ textAlign: "center" }}>
                {dt.name}
              </h1>
              <p className="institution-bio" style={{ textAlign: "center" }}>
                {dt.bio || dt.description || "No description available"}
              </p>

              <div className="institution-stats">
                <div className="stat-item">
                  <BookOpen size={16} />
                  <span>{dt.journals ? dt.journals.length : 0} Journals</span>
                </div>
                <div className="stat-item">
                  <CheckCircle size={16} />
                  <span>0 Approved</span>
                </div>
                <div className="stat-item">
                  <Clock size={16} />
                  <span>0 Pending</span>
                </div>
              </div>
            </div>

            <div className="profile-nav">
              <button
                className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <GraduationCap size={18} />
                Institution Profile
              </button>
              <button
                className={`nav-tab ${
                  activeTab === "journals" ? "active" : ""
                }`}
                onClick={() => setActiveTab("journals")}
              >
                <BookOpen size={18} />
                Journals ({dt.journals ? dt.journals.length : 0})
              </button>
            </div>
            <div className="profile-content">
              {activeTab === "profile" && (
                <div className="profile-tab-content">
                  <div className="profile-info-grid">
                    <div className="info-card">
                      <h3 className="titlesss">Institution Information</h3>
                      <div className="info-item">
                        <strong>Name:</strong>
                        <span>{dt.name}</span>
                      </div>
                      <div className="info-item">
                        <strong>Email:</strong>
                        <span>{dt.email}</span>
                      </div>
                      <div className="info-item">
                        <strong>Accreditation Number:</strong>
                        <span>{dt.accreditationNumber}</span>
                      </div>
                      <div className="info-item">
                        <strong>Description:</strong>
                        <span></span>
                      </div>
                      {dt.website && (
                        <div className="info-item">
                          <Globe size={16} />
                          <strong>Website:</strong>
                          <a
                            href={dt.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {dt.website}
                          </a>
                        </div>
                      )}
                      {dt.contactEmail && (
                        <div className="info-item">
                          <Mail size={16} />
                          <strong>Contact Email:</strong>
                          <a href={`mailto:${dt.contactEmail}`}>
                            {dt.contactEmail}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="stats-card">
                      <h3>Publication Statistics</h3>
                      <div className="stats-grid">
                        <div className="stat-box">
                          <div className="stat-number">
                            {dt.journals ? dt.journals.length : 0}
                          </div>
                          <div className="stat-label">Total Journals</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-number">0</div>
                          <div className="stat-label">Approved</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-number">0</div>
                          <div className="stat-label">Pending</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-number">0</div>
                          <div className="stat-label">Rejected</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "journals" && (
                <div className="journals-tab-content">
                  {/* Empty state for journals */}
                  <div className="empty-state">
                    <BookOpen className="empty-icon" size={64} />
                    <h3 className="empty-title">No journals to display</h3>
                    <p className="empty-message">
                      Journal functionality is currently disabled. Only
                      institution information is shown.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}

        {/* Tab Content */}
      </div>
    </>
  );
};

export default InstitutionProfile;
