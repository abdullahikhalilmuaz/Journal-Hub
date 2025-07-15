import React, { useState, useEffect } from "react";
import "../styles/collaborate.css";

const API_BASE_URL = "http://localhost:5000/api/alluser/message";

export default function Collaborate() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    setMessages(data.messages);
  };

  const handleFile = () => {
    const fileInput = document.querySelector("input[type='file']");
    fileInput.click();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!user) {
      window.alert("user not found");
    }
    formData.append("username", user.email.split("@")[0]);
    formData.append("userEmail", user.email);
    formData.append("messageContent", newMessage);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to send message");
      setMessages([...messages, result.newMessage]);
      setNewMessage("");
      setSelectedFile(null);
      alert(result.message); // Display the response message
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.message); // Display the error message
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        <div className="bubbles">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble ${
                msg.username === "CurrentUser" ? "my-message" : "other-message"
              }`}
            >
              <strong>{msg.username}</strong>: {msg.messageContent}
              {msg.file && (
                <a
                  href={`http://localhost:5000${msg.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download File
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="form">
          <form className="message-form">
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
            />
            <button type="button" onClick={handleFile}>
              File
            </button>
            <button type="submit" onClick={sendMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

