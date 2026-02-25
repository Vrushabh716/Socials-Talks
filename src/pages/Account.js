import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function Account() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(storedUser);

  if (!storedUser) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditing(false);
    navigate("/"); // Go to Home after update
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="page-center">
        <div className="card form-container">
          <h2 className="form-title">Account Details</h2>

          {!isEditing ? (
            <>
              <div className="account-info">
                <p><strong>First Name:</strong> {formData.firstName}</p>
                <p><strong>Last Name:</strong> {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Username:</strong> {formData.username}</p>
              </div>

              <div className="account-buttons">
                <button className="btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>

                <button className="btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="account-buttons">
                <button type="submit" className="btn">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="btn logout-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;