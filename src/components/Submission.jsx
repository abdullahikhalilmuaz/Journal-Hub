import { useState } from "react";
import "../styles/submission.css";

const API_BASE_URL = "http://localhost:5000/api/journals";

export default function Submission() {
  const [formData, setFormData] = useState({
    journalName: "",
    author: "",
    institutionId: "",
    institutionName: "",
    category: "Science",
    publicationFrequency: "Monthly",
    file: null,
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    error: null,
    success: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      journalName: "",
      author: "",
      institutionId: "",
      institutionName: "",
      category: "Science",
      publicationFrequency: "Monthly",
      file: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const requiredFields = [
      "journalName",
      "author",
      "institutionId",
      "institutionName",
      "file",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setStatus({
        isSubmitting: false,
        error: `Please fill in all required fields: ${missingFields.join(
          ", "
        )}`,
        success: null,
      });
      return;
    }

    setStatus({
      isSubmitting: true,
      error: null,
      success: null,
    });

    const formPayload = new FormData();
    formPayload.append("name", formData.journalName);
    formPayload.append("author", formData.author);
    formPayload.append("institutionId", formData.institutionId);
    formPayload.append("institutionName", formData.institutionName);
    formPayload.append("category", formData.category);
    formPayload.append("publicationFrequency", formData.publicationFrequency);
    formPayload.append("file", formData.file);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to submit journal. Please try again."
        );
      }

      setStatus({
        isSubmitting: false,
        error: null,
        success:
          "Journal submitted successfully! You'll be redirected shortly...",
      });

      resetForm();

      // Optional: Redirect after success
      setTimeout(() => {
        // window.location.href = '/journals'; // Uncomment to enable redirect
      }, 2000);
    } catch (err) {
      setStatus({
        isSubmitting: false,
        error: err.message,
        success: null,
      });
    }
  };

  return (
    <div className="submission-container">
      <h1>Submit a Journal</h1>
      <form
        onSubmit={handleSubmit}
        className="submission-form"
        encType="multipart/form-data"
      >
        {/* Journal Name */}
        <label>
          Journal Name:
          <input
            type="text"
            name="journalName"
            value={formData.journalName}
            onChange={handleChange}
            required
          />
        </label>

        {/* Author */}
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>

        {/* Institution ID */}
        <label>
          Institution ID:
          <input
            type="text"
            name="institutionId"
            value={formData.institutionId}
            onChange={handleChange}
            required
            placeholder="Institution MongoDB _id"
          />
        </label>

        {/* Institution Name */}
        <label>
          Institution Name:
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            required
            placeholder="Institution display name"
          />
        </label>

        {/* Category */}
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Science">Science</option>
            <option value="Education">Education</option>
            <option value="Languages">Languages</option>
          </select>
        </label>

        {/* Publication Frequency */}
        <label>
          Publication Frequency:
          <select
            name="publicationFrequency"
            value={formData.publicationFrequency}
            onChange={handleChange}
            required
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annually">Annually</option>
          </select>
        </label>

        {/* File Upload */}
        <label>
          Upload File (PDF only!):
          <input
            type="file"
            name="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            required
          />
        </label>

        <button
          style={{
            color: "orange",
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#c5630c",
            cursor: "pointer",
            color: "white",
          }}
          type="submit"
          disabled={status.isSubmitting}
          className={status.isSubmitting ? "submitting" : ""}
        >
          {status.isSubmitting ? (
            <>
              <span className="spinner"></span> Submitting...
            </>
          ) : (
            "Submit Journal"
          )}
        </button>

        {/* Status Messages */}
        {status.error && (
          <div className="error-message">
            <p>❌ {status.error}</p>
          </div>
        )}

        {status.success && (
          <div className="success-message">
            <p>✅ {status.success}</p>
          </div>
        )}
      </form>
    </div>
  );
}
