"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, you would send the email here
      console.log("Password reset email sent to:", email);
    }, 2000);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <div className="login-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <div className="cards-container">
        {/* Forgot Password Card */}
        <div className="login-card">
          {!isSubmitted ? (
            <>
              <h1 className="login-title">Forgot Password?</h1>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                  <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="forgot-password">
                  <span className="forgot-text">Remember your password? </span>
                  <Link href="/login" className="forgot-link">
                    Back to Login
                  </Link>
                </div>
                
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="login-title">Check Your Email!</h1>
              <div className="success-content">
                <p className="success-message">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                
                <div className="success-actions">
                  <button onClick={handleBackToLogin} className="login-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Login
                  </button>
                  <button onClick={handleResendEmail} className="resend-button">
                    Resend Email
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-content">
            <div className="golf-logo">
              <img src="/icon.png" alt="Golf Tee Logo" className="logo-image" />
            </div>
            <h2 className="welcome-title">Welcome</h2>
            <p className="welcome-subtitle">to Admin Portal of GolfTee</p>
            <button className="signup-button" onClick={() => window.location.href = '/signup'}>
              Sign Up
            </button>
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
          max-width: 900px;
          width: 100%;
        }

        .login-card {
          width: 400px;
          height: 480px;
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
          font-size: 1.5rem;
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

        .forgot-password {
          text-align: center;
          margin-top: -0.3rem;
        }

        .forgot-text {
          color: #6b7280;
          font-size: 0.8rem;
        }

        .forgot-link {
          color: #22c55e;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
          color: #16a34a;
        }

        .login-button {
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s;
          margin-top: 0.8rem;
        }

        .login-button:hover:not(:disabled) {
          background: #16a34a;
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-content {
          text-align: center;
        }

        .success-message {
          font-size: 1rem;
          color: #374151;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .resend-button {
          background: white;
          color: #22c55e;
          border: 2px solid #22c55e;
          border-radius: 6px;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .resend-button:hover {
          background: #22c55e;
          color: white;
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

        .signup-button {
          background: rgba(40, 173, 13, 0.8);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0.6rem 1.8rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.2s;
          display: inline-block;
          cursor: pointer;
        }

        .signup-button:hover {
          background: rgba(69, 136, 24, 1);
          transform: translateY(-1px);
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