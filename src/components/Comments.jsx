import { useState } from "react";
import "../styles/comment.css";

export default function Comments({ setShowComment, post, postIndex }) {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  function handleBack() {
    setShowComment(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userComment.trim()) return;
    const userDetail = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `http://localhost:5000/api/news/${postIndex}/comment`, // Use postIndex instead of post._id
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userDetail,
            username: "JohnDoe",
            comment: userComment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      setComments([...comments, data.comment]); // Update state with new comment
      setUserComment(""); // Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="comment-container">
      <div className="top">
        <div className="header">
          <span onClick={handleBack}>&laquo;</span>
          <div>
            <span>{post.user.email}</span>
            <span>{post.date}</span>
          </div>
        </div>
        <div className="body">
          <p>{post.body}</p>
        </div>
        <div className="image">
          <img src={`${post.image}`} alt="" />
        </div>
      </div>

      {/* Display comments */}
      <div className="bottom">
        <div className="bottom-top">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.user.username}</strong>: {comment.comment}
            </div>
          ))}
        </div>
        <div className="bottom-bottom">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
