"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time and then redirect to login/signup
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Auto redirect to login page after 1 second
      setTimeout(() => {
        // Mark that user has seen splash page
        sessionStorage.setItem('hasSeenSplash', 'true');
        router.push('/login');
      }, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="splash-container">
      {/* Background Elements */}
      <div className="bg-circle-top-left" />
      <div className="bg-circle-bottom-right" />
      <div className="bg-pattern" />
      
      {/* Main Content */}
      <div className="splash-content">
        {/* Logo Container */}
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src="/icon.png" alt="GolfTee Logo" className="main-logo" />
          </div>
          <div className="logo-glow" />
        </div>
        
        {/* Brand Text */}
        <div className="brand-section">
          <h1 className="brand-title">GolfTee</h1>
          <p className="brand-subtitle">Admin Portal</p>
          <div className="brand-tagline">
            <span>Complete Golf Club Management Solution</span>
          </div>
        </div>
        
        {/* Loading Animation */}
        <div className="loading-section">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <p className="loading-text">Loading your golf management experience...</p>
            </div>
          ) : (
            <div className="ready-container">
              <div className="check-icon">✓</div>
              <p className="ready-text">Ready to tee off!</p>
            </div>
          )}
        </div>
        
        {/* Features Preview */}
        <div className="features-preview">
          <div className="feature-item">
            <div className="feature-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                <rect x="4" y="11" width="3" height="7" rx="1"></rect>
                <rect x="10.5" y="7" width="3" height="11" rx="1"></rect>
                <rect x="17" y="14" width="3" height="4" rx="1"></rect>
              </svg>
            </div>
            <span>Analytics</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                <rect x="3" y="5" width="18" height="16" rx="2" ry="2"></rect>
                <path strokeLinecap="round" d="M8 3v4M16 3v4"></path>
                <path d="M3 10h18"></path>
                <rect x="6.5" y="12.5" width="3" height="3" rx="0.5"></rect>
                <rect x="11.5" y="12.5" width="3" height="3" rx="0.5"></rect>
                <rect x="16.5" y="12.5" width="3" height="3" rx="0.5"></rect>
              </svg>
            </div>
            <span>Bookings</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8v3a4 4 0 0 0 4 4h0V9a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v4h0a4 4 0 0 0 4-4V6z" />
                <path d="M9 18h6" />
                <path d="M10 21h4" />
                <path d="M12 6v6" />
              </svg>
            </div>
            <span>Tournaments</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
                <circle cx="9" cy="7" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M23 20v-1a4 4 0 0 0-3-3.87" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a3 3 0 0 1 0 5.74" />
              </svg>
            </div>
            <span>Members</span>
          </div>
        </div>
      </div>
      
      {/* Version Info */}
      <div className="version-info">
        <span>Version 2.0.1</span>
      </div>

      <style jsx>{`
        .splash-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #15241aff 0%, #0F7C6D 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .bg-circle-top-left {
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .bg-circle-bottom-right {
          position: absolute;
          bottom: -300px;
          right: -300px;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px, 30px 30px;
        }
        
        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 10;
          max-width: 500px;
          padding: 2rem;
        }
        
        .logo-container {
          position: relative;
          margin-bottom: 3rem;
        }
        
        .logo-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          animation: logoFloat 3s ease-in-out infinite;
        }
        
        .main-logo {
          width: 100px;
          height: auto;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
        }
        
        .logo-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: logoGlow 2s ease-in-out infinite alternate;
        }
        
        .brand-section {
          margin-bottom: 3rem;
        }
        
        .brand-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin: 0 0 0.5rem 0;
          text-shadow: 
            0 2px 10px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 255, 255, 0.2);
          letter-spacing: -0.02em;
          animation: titleSlide 1s ease-out 0.5s both;
        }
        
        .brand-subtitle {
          font-size: 1.4rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1.5rem 0;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          animation: titleSlide 1s ease-out 0.7s both;
        }
        
        .brand-tagline {
          animation: titleSlide 1s ease-out 0.9s both;
        }
        
        .brand-tagline span {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .loading-section {
          margin-bottom: 3rem;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        
        .loading-spinner {
          position: relative;
          width: 60px;
          height: 60px;
        }
        
        .spinner-ring {
          position: absolute;
          border: 3px solid transparent;
          border-top-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }
        
        .spinner-ring:nth-child(1) {
          width: 60px;
          height: 60px;
          animation-delay: -0.45s;
        }
        
        .spinner-ring:nth-child(2) {
          width: 45px;
          height: 45px;
          top: 7.5px;
          left: 7.5px;
          animation-delay: -0.3s;
          border-top-color: rgba(255, 255, 255, 0.6);
        }
        
        .spinner-ring:nth-child(3) {
          width: 30px;
          height: 30px;
          top: 15px;
          left: 15px;
          animation-delay: -0.15s;
          border-top-color: rgba(255, 255, 255, 0.4);
        }
        
        .loading-text {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          animation: textPulse 2s ease-in-out infinite;
        }
        
        .ready-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: readyFade 0.8s ease-out;
        }
        
        .check-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          animation: checkBounce 0.6s ease-out;
        }
        
        .ready-text {
          font-size: 1.1rem;
          color: white;
          margin: 0;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .features-preview {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: featuresSlide 1s ease-out 1.2s both;
        }
        
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          min-width: 80px;
        }
        
        .feature-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .feature-icon {
          font-size: 1.5rem;
          color: #ffffff;
        }
        
        .feature-item span {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .version-info {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        
        /* Animations */
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes logoGlow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes titleSlide {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes textPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }
        
        @keyframes readyFade {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes checkBounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes featuresSlide {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .splash-content {
            padding: 1rem;
          }
          
          .logo-wrapper {
            width: 120px;
            height: 120px;
          }
          
          .main-logo {
            width: 80px;
          }
          
          .brand-title {
            font-size: 2.5rem;
          }
          
          .brand-subtitle {
            font-size: 1.1rem;
          }
          
          .features-preview {
            gap: 1rem;
          }
          
          .feature-item {
            min-width: 70px;
            padding: 0.75rem;
          }
          
          .version-info {
            bottom: 1rem;
            right: 1rem;
            font-size: 0.7rem;
          }
        }
        
        @media (max-width: 480px) {
          .brand-title {
            font-size: 2rem;
          }
          
          .features-preview {
            gap: 0.5rem;
          }
          
          .feature-item {
            min-width: 60px;
            padding: 0.5rem;
          }
          
          .feature-icon {
            font-size: 1.2rem;
          }
          
          .feature-item span {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}