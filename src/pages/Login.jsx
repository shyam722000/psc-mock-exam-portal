import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../users";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const valid = users.find(
      (u) =>
        u.username === username.trim() &&
        u.password === password.trim()
    );

    if (valid) {
      // ✅ Store username
      localStorage.setItem("psc_username", username.trim());
      sessionStorage.setItem("psc_username", username.trim());

      navigate("/language");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">

        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Exam Portal Login</h2>
            <p className="login-card-subtitle">
              Enter your credentials to continue
            </p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-text">{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
            />
          </div>

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={!username || !password}
          >
            Sign In
          </button>
        </div>

        <div className="bottom-footer">
          <p>© 2026 Kerala Public Service Commission. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
