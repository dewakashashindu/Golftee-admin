"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthToken, setStoredUser } from "@/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock token
    const token = 'mock-token-' + Date.now();
    
    // Set auth token and user data
    setAuthToken(token);
    setStoredUser({ 
      username,
      email: `${username}@golftee.com`,
      name: 'Royal Colombo'
    });
    
    // Redirect to home (dashboard)
    router.push('/home');
  };

  return (
    <div className="login-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <div className="cards-container">
        {/* Login Card */}
        <div className="login-card">
          <h1 className="login-title">Login as Admin</h1>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.625 2.625 0 01-2.66 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Input Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Input Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="forgot-password">
              <Link href="/forgot-password" className="forgot-link">
                Forgot Your Password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
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
          text-align: right;
          margin-top: -0.3rem;
        }

        .forgot-link {
          color: #22c55e;
          text-decoration: none;
          font-size: 0.8rem;
        }

        .forgot-link:hover {
          text-decoration: underline;
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
        
        }

        .signup-button:hover {
          background: rgba(69, 136, 24, 1);
          transform: translateY(-1px);
        }

        @media (max-width: 1200px) {
          .login-container {
            padding: 1.5rem;
          }

          .cards-container {
            max-width: 800px;
          }

          .login-card {
            width: 380px;
            height: 460px;
            padding: 2rem;
          }

          .welcome-card {
            width: 500px;
            height: 650px;
          }

          .login-title {
            font-size: 1.4rem;
            margin-bottom: 2rem;
          }

          .welcome-title {
            font-size: 3.8rem;
          }
        }

        @media (max-width: 968px) {
          .cards-container {
            flex-direction: column;
            gap: 1.5rem;
            max-width: 450px;
          }

          .login-card {
            margin-right: 0;
            width: 100%;
            max-width: 420px;
            height: auto;
            padding: 2rem 1.5rem;
            order: 2;
          }

          .welcome-card {
            width: 100%;
            max-width: 420px;
            height: 300px;
            order: 1;
          }

          .welcome-title {
            font-size: 3rem;
            margin-bottom: 0.3rem;
          }

          .welcome-subtitle {
            font-size: 0.9rem;
            margin-bottom: 1.2rem;
          }

          .golf-logo {
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 768px) {
          .login-container {
            padding: 1rem;
            min-height: 100vh;
          }

          .cards-container {
            gap: 1rem;
            max-width: 380px;
          }

          .login-card {
            width: 100%;
            max-width: 360px;
            padding: 1.5rem;
            border-radius: 16px;
          }

          .welcome-card {
            width: 100%;
            max-width: 360px;
            height: 250px;
            border-radius: 16px;
          }

          .login-title {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }

          .form-input {
            padding: 0.7rem 0.7rem 0.7rem 2.5rem;
            font-size: 0.85rem;
          }

          .input-icon {
            left: 0.7rem;
          }

          .login-button {
            padding: 0.8rem 1.2rem;
            font-size: 1rem;
            margin-top: 1.2rem;
          }

          .forgot-link {
            font-size: 0.75rem;
          }

          .welcome-title {
            font-size: 2.5rem;
          }

          .welcome-subtitle {
            font-size: 0.85rem;
          }

          .signup-button {
            padding: 0.5rem 1.5rem;
            font-size: 0.85rem;
            border-radius: 16px;
          }

          .golf-logo {
            width: 70px;
            height: 70px;
          }

          .logo-image {
            width: 140%;
            height: 140%;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 0.5rem;
          }

          .cards-container {
            gap: 0.75rem;
            max-width: 320px;
          }

          .login-card {
            width: 100%;
            max-width: 300px;
            padding: 1.25rem;
          }

          .welcome-card {
            width: 100%;
            max-width: 300px;
            height: 220px;
          }

          .login-title {
            font-size: 1.2rem;
            margin-bottom: 1.25rem;
          }

          .form-input {
            padding: 0.65rem 0.65rem 0.65rem 2.3rem;
            font-size: 0.8rem;
          }

          .input-icon {
            left: 0.6rem;
          }

          .input-icon svg {
            width: 18px;
            height: 18px;
          }

          .login-button {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .login-button svg {
            width: 18px;
            height: 18px;
          }

          .welcome-title {
            font-size: 2.2rem;
          }

          .welcome-subtitle {
            font-size: 0.8rem;
            line-height: 1.2;
          }

          .signup-button {
            padding: 0.45rem 1.25rem;
            font-size: 0.8rem;
          }

          .golf-logo {
            width: 60px;
            height: 60px;
          }

          .bg-circle-left {
            left: -400px;
            top: -300px;
          }

          .bg-circle-right {
            right: -300px;
            bottom: -700px;
          }
        }

        @media (max-width: 360px) {
          .cards-container {
            max-width: 280px;
          }

          .login-card {
            max-width: 260px;
            padding: 1rem;
          }

          .welcome-card {
            max-width: 260px;
            height: 200px;
          }

          .login-title {
            font-size: 1.1rem;
          }

          .welcome-title {
            font-size: 2rem;
          }

          .form-input {
            padding: 0.6rem 0.6rem 0.6rem 2.1rem;
          }

          .input-icon {
            left: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}