"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Simulate reset success
    alert("Password reset successful!");
    router.push("/login");
  };

  return (
    <div className="login-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      <div className="cards-container">
        {/* Reset Password Card */}
        <div className="login-card">
          <h1 className="login-title">Reset Password</h1>
          <form onSubmit={handleReset} className="login-form">
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Conform Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="login-button">Conform</button>
          </form>
        </div>
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-content">
            <div className="golf-logo">
              <img src="/icon.png" alt="Golf Tee Logo" className="logo-image" />
            </div>
            <h2 className="welcome-title">Welcome</h2>
            <p className="welcome-subtitle">to Admin Portal of GolfTee</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        .bg-circle-left {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }
        .bg-circle-right {
          position: absolute;
          right: -200px;
          bottom: -600px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }
        .cards-container {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          max-width: 1100px;
          width: 100%;
        }
        .login-card {
          width: 500px;
          height: 550px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 3;
          margin-right: -50px;
        }
        .welcome-card {
          width: 550px;
          height: 700px;
          background: #349654;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          color: white;
          text-align: center;
        }
        .login-title {
          font-size: 2rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .input-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: #22c55e;
          z-index: 2;
        }
        .form-input {
          width: 100%;
          padding: 0.8rem 0.8rem 0.8rem 2.8rem;
          border: 2px solid #22c55e;
          border-radius: 6px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
          background: white;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #16a34a;
        }
        .form-input::placeholder {
          color: #9ca3af;
          font-size: 0.85rem;
        }
        .login-button {
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.9rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s;
          margin-top: 1.8rem;
        }
        .login-button:hover {
          background: #16a34a;
        }
        .welcome-content {
          padding: 1.5rem;
        }
        .golf-logo {
          width: 100px;
          height: 100px;
          background: white;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .logo-image {
          width: 160%;
          height: 160%;
          object-fit: contain;
        }
        .welcome-title {
          font-size: 4.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .welcome-subtitle {
          font-size: 1rem;
          margin-bottom: 1.8rem;
          opacity: 0.95;
          line-height: 1.3;
        }
        @media (max-width: 768px) {
          .cards-container {
            flex-direction: column;
            gap: 2rem;
          }
          .login-card {
            margin-right: 0;
            width: 90%;
            max-width: 400px;
          }
          .welcome-card {
            width: 90%;
            max-width: 350px;
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
