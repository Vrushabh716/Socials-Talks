import { useState } from "react";
import "../styles/theme.css";

function PostCard({ title, description }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [agreeCount, setAgreeCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);
  const [userVote, setUserVote] = useState(null);

  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  // =============================
  // Voting Logic (Only One Vote)
  // =============================

  const handleVote = (type) => {
    if (!user) {
      alert("Please login to vote");
      return;
    }

    if (userVote) {
      alert("You have already voted!");
      return;
    }

    if (type === "agree") {
      setAgreeCount(agreeCount + 1);
    } else {
      setDisagreeCount(disagreeCount + 1);
    }

    setUserVote(type);
  };

  // =============================
  // Add Main Reply
  // =============================

  const handleReply = () => {
    if (!user) {
      alert("Login to reply");
      return;
    }

    if (replyText.trim() === "") return;

    const newReply = {
      id: Date.now(),
      username: user.username,
      text: replyText,
      likes: 0,
      likedBy: [],
      replies: []
    };

    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReplyBox(false);
  };

  // =============================
  // Like Reply (Only Once)
  // =============================

  const handleLikeReply = (replyId) => {
    if (!user) {
      alert("Login to like replies");
      return;
    }

    setReplies(
      replies.map((reply) => {
        if (reply.id === replyId) {
          if (reply.likedBy.includes(user.username)) {
            return reply;
          }

          return {
            ...reply,
            likes: reply.likes + 1,
            likedBy: [...reply.likedBy, user.username]
          };
        }
        return reply;
      })
    );
  };

  // =============================
  // Reply to Reply
  // =============================

  const handleNestedReply = (replyId, text) => {
    if (!user) {
      alert("Login to reply");
      return;
    }

    setReplies(
      replies.map((reply) => {
        if (reply.id === replyId) {
          const newNestedReply = {
            id: Date.now(),
            username: user.username,
            text,
            likes: 0,
            likedBy: []
          };

          return {
            ...reply,
            replies: [...reply.replies, newNestedReply]
          };
        }
        return reply;
      })
    );
  };

  return (
    <div className="post-card">
      <h3 className="post-title">{title}</h3>
      <p className="post-content">{description}</p>

      <div className="post-actions">
        <button
          className={`agree-btn ${userVote === "agree" ? "active-vote" : ""}`}
          onClick={() => handleVote("agree")}
        >
          👍 Agree ({agreeCount})
        </button>

        <button
          className={`disagree-btn ${userVote === "disagree" ? "active-vote" : ""}`}
          onClick={() => handleVote("disagree")}
        >
          👎 Disagree ({disagreeCount})
        </button>

        <button
          className="reply-btn"
          onClick={() => setShowReplyBox(!showReplyBox)}
        >
          💬 Reply
        </button>
      </div>

      {showReplyBox && (
        <div className="reply-box">
          <textarea
            className="form-input"
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="btn small-btn" onClick={handleReply}>
            Post Reply
          </button>
        </div>
      )}

      <div className="reply-section">
        {replies.map((reply) => (
          <ReplyItem
            key={reply.id}
            reply={reply}
            handleLikeReply={handleLikeReply}
            handleNestedReply={handleNestedReply}
          />
        ))}
      </div>
    </div>
  );
}

// =============================
// Reply Component
// =============================

function ReplyItem({ reply, handleLikeReply, handleNestedReply }) {
  const [nestedText, setNestedText] = useState("");
  const [showNestedBox, setShowNestedBox] = useState(false);

  return (
    <div className="reply-item">
      <strong>{reply.username}</strong>
      <p>{reply.text}</p>

      <div className="reply-actions">
        <button
          className="like-reply-btn"
          onClick={() => handleLikeReply(reply.id)}
        >
          👍 {reply.likes}
        </button>

        <button
          className="nested-reply-btn"
          onClick={() => setShowNestedBox(!showNestedBox)}
        >
          Reply
        </button>
      </div>

      {showNestedBox && (
        <div className="nested-reply-box">
          <textarea
            className="form-input"
            placeholder="Reply..."
            value={nestedText}
            onChange={(e) => setNestedText(e.target.value)}
          />
          <button
            className="btn small-btn"
            onClick={() => {
              handleNestedReply(reply.id, nestedText);
              setNestedText("");
              setShowNestedBox(false);
            }}
          >
            Post
          </button>
        </div>
      )}

      {reply.replies.length > 0 && (
        <div className="nested-replies">
          {reply.replies.map((nested) => (
            <div key={nested.id} className="nested-item">
              <strong>{nested.username}</strong>
              <p>{nested.text}</p>
              <span>👍 {nested.likes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;