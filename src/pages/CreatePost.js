import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description
    };

    setPosts([...posts, newPost]);
    navigate("/");
  };

  return (
    <div className="app-container">
      <div className="page-center">
        <div className="card form-container">
          <h2 className="form-title">Create Opinion</h2>
          <p className="form-subtitle">
            Share your thoughts with the community
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Opinion</label>
              <textarea
                className="form-input"
                placeholder="Write your opinion..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">
              Post Opinion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;