import "../styles/news.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Comments from "./Comments";
import NewPost from "./NewPost";
import Loader from "./Loader";

const URL = "https://journal-hub-server.onrender.com/api/news";

export default function News() {
  const [data, setData] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL);
        const newsData = await res.json();
        console.log("Fetched data:", newsData);
        setData(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    getData();
  }, []);

  const handleComments = (index) => {
    setSelectedPostIndex(index);
    setShowComment(true);
  };

  const handleLike = async (postId) => {
    const userId = "someUserId";
    try {
      const res = await fetch(`${URL}/${postId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const result = await res.json();

      if (res.ok) {
        const updatedData = data.map((post, index) =>
          index === postId ? { ...post, likes: result.likes } : post
        );
        setData(updatedData);
      } else {
        console.error("Failed to toggle like:", result.error);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="news-container">
      {data ? (
        showComment ? (
          <Comments
            setShowComment={setShowComment}
            post={data[selectedPostIndex]}
            postIndex={selectedPostIndex}
          />
        ) : (
          <div>
            {data.map((post, index) => {
              const likes = Array.isArray(post.likes) ? post.likes : [];

              return (
                <div key={index} className="news-wrapper">
                  <div className="news-header">
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                      </svg>
                      <h3 style={{ marginLeft: "20px" }}>{post.user.email}</h3>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  <div className="news-content">
                    <div className="title">
                      <p>{post.body}</p>
                    </div>
                    <div className="content-body">
                      {post.image && (
                        <img
                          src={post.image}
                          alt="news"
                          style={{
                            width: "100%",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="news-footer">
                    <div
                      onClick={() => handleLike(index)}
                      style={{
                        cursor: "pointer",
                        color: likes.some(
                          (like) => like.userId === "someUserId"
                        )
                          ? "blue"
                          : "black",
                      }}
                    >
                      {t("likes")}: {likes.length}
                    </div>
                    <div onClick={() => handleComments(index)}>
                      {t("comments")}: {post.comments.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}
