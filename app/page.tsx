"use client";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  return (
    <div className="main-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
            {/* Top Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="/bookings" className="nav-link">Bookings</a>
          <div className="nav-link notification-section" onClick={() => setShowNotificationCard(!showNotificationCard)}>
            <span>Notifications</span>
            {showNotificationCard && (
              <div className="notification-card">
                <div className="notification-card-header">
                  <h3 className="notification-card-title">Notifications</h3>
                </div>
                <div className="notification-card-body">
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-text">New booking request from John Doe</p>
                      <span className="notification-time">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-text">Tournament schedule updated</p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-text">Payment received from Royal Club</p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="notification-card-footer">
                  <button className="notification-btn view-all-btn">View All</button>
                  <button className="notification-btn mark-read-btn">Mark All Read</button>
                </div>
              </div>
            )}
          </div>
          <div className="nav-link nav-dropdown">
            <span>Settings <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => window.location.href = '/reset-password'}>
                <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Reset Password
              </div>
              <div className="dropdown-item" onClick={() => window.location.href = '/edit-profile'}>
                <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Edit Profile
              </div>
            </div>
          </div>
        </div>
        <div className="profile-section" onClick={() => setShowProfileCard(!showProfileCard)}>
          <div className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          </div>
          <span className="profile-name">Royal Colombo</span>
          
          {showProfileCard && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="32" height="32">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75.75v-.75z" />
                  </svg>
                </div>
              </div>
              <div className="profile-card-body">
                <h3 className="profile-card-title">Royal Colombo Golf Course</h3>
                <p className="profile-card-email">royalgolf@gmail.com</p>
                <p className="profile-card-phone">0775698201</p>
              </div>
              <div className="profile-card-footer">
                <button className="profile-btn cancel-btn" onClick={() => setShowProfileCard(false)}>
                  Cancel
                </button>
                <Link href="/login" className="profile-btn logout-btn">
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Text Content */}
        <div className="text-section">
          <h1 className="main-title">GolfTee</h1>
          <p className="main-description">
            Manage players, tournaments, and club activities all in one place. Stay on top of game stats, schedules, and performance insights with ease.
          </p>
          
          <Link href="/analytics" className="analytics-button">
            <button className="blob-btn">
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
              Go to Analytics
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                <defs>
                  <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/><feBlend in="SourceGraphic" in2="goo"/></filter>
                </defs>
              </svg>
            </button>
          </Link>
          
        </div>
        
        {/* Right Side - Illustration */}
        <div className="illustration-section">
          <div className="illustration-container">
            <img src="/main.png" alt="Dashboard Analytics Illustration" className="main-illustration" />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .main-container {
          min-height: 100vh;
          background: #f5f5f5;
          position: relative;
          overflow: hidden;
        }
        
        .bg-circle-left {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 0.8;
          z-index: 0;
        }
        
        .bg-circle-right {
          position: absolute;
          right: -200px;
          bottom: -600px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 0.8;
          z-index: 0;
        }
        
        .navigation {
          position: relative;
          z-index: 1001;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 4rem;
        }
        
        .nav-links {
          display: flex;
          gap: 3rem;
        }
        
        .nav-link {
          font-size: 1.125rem;
          font-weight: 500;
          color: #111;
          text-decoration: none;
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }
        .nav-dropdown {
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        .dropdown-arrow {
          font-size: 0.7em;
          margin-left: 0.4em;
          vertical-align: middle;
          transition: transform 0.2s;
        }
        .nav-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }
        .dropdown-menu {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          min-width: 180px;
          background: #fff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-radius: 12px;
          z-index: 1000;
          padding: 0.5em 0;
          margin-top: 8px;
          animation: dropdownFadeIn 0.18s ease-out;
        }
        .dropdown-menu a {
          color: #6b7280 !important;
          text-decoration: none !important;
        }
        .dropdown-menu a:hover {
          color: #374151 !important;
          text-decoration: none !important;
        }
        .dropdown-menu a:visited {
          color: #6b7280 !important;
          text-decoration: none !important;
        }
        .dropdown-menu a:focus {
          color: #374151 !important;
          text-decoration: none !important;
          outline: none !important;
        }
        .nav-dropdown:hover .dropdown-menu,
        .nav-dropdown:focus-within .dropdown-menu {
          display: block;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: #6b7280;
          text-decoration: none !important;
          font-size: 0.95rem;
          font-weight: 400;
          border: none;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
          margin: 0;
        }
        .dropdown-item:hover {
          background: #f9fafb;
          color: #374151;
          text-decoration: none !important;
        }
        .dropdown-item:focus {
          outline: none;
          text-decoration: none !important;
        }
        .dropdown-item:visited {
          color: #6b7280;
          text-decoration: none !important;
        }
        .dropdown-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
          @keyframes dropdownFadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-link:hover {
          color: #16a34a;
          transform: translateY(-2px);
          background: rgba(74, 222, 128, 0.1);
          box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
        }
        
        .nav-link:hover::before {
          width: 80%;
        }
        
        .nav-link:active {
          transform: translateY(-1px);
          transition: all 0.1s ease;
        }
        
        .profile-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .profile-section:hover {
          background: rgba(0,0,0,0.05);
        }
        
        .profile-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-name {
          font-weight: 500;
          font-size: 1.125rem;
          color: #111;
        }
        
        .profile-card {
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          margin-top: 8px;
          animation: profileCardFadeIn 0.2s ease-out;
        }
        
        .profile-card-header {
          padding: 1.5rem 1.5rem 1rem;
          text-align: center;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .profile-card-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .profile-card-body {
          padding: 1rem 1.5rem 1.5rem;
          text-align: center;
        }
        
        .profile-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }
        
        .profile-card-email {
          font-size: 0.9rem;
          color: #666;
          margin: 0.3rem 0;
        }
        
        .profile-card-phone {
          font-size: 0.9rem;
          color: #666;
          margin: 0.3rem 0 0 0;
        }
        
        .profile-card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }
        
        .profile-btn {
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          outline: none;
        }
        
        .cancel-btn {
          background: #f3f4f6;
          color: #666;
        }
        
        .cancel-btn:hover {
          background: #e5e7eb;
          color: #333;
        }
        
        .logout-btn {
          background: #ef4444;
          color: white;
        }
        
        .logout-btn:hover {
          background: #dc2626;
        }
        
        .notification-section {
          position: relative;
          cursor: pointer;
        }
        
        .notification-card {
          position: absolute;
          top: 100%;
          left: 0;
          width: 350px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          margin-top: 8px;
          animation: notificationCardFadeIn 0.2s ease-out;
        }
        
        .notification-card-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .notification-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0;
        }
        
        .notification-card-body {
          padding: 0;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f9fafb;
          transition: background 0.2s;
        }
        
        .notification-item:hover {
          background: #f9fafb;
        }
        
        .notification-item:last-child {
          border-bottom: none;
        }
        
        .notification-dot {
          width: 8px;
          height: 8px;
          background: #13a905ff;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-text {
          font-size: 0.9rem;
          color: #111;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }
        
        .notification-time {
          font-size: 0.8rem;
          color: #666;
        }
        
        .notification-card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }
        
        .notification-btn {
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          outline: none;
        }
        
        .view-all-btn {
          background: #13a905ff;
          color: white;
        }
        
        .view-all-btn:hover {
          background: #0f7a04;
        }
        
        .mark-read-btn {
          background: #f3f4f6;
          color: #666;
        }
        
        .mark-read-btn:hover {
          background: #e5e7eb;
          color: #333;
        }
        
        @keyframes notificationCardFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-8px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes profileCardFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-8px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .main-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3rem 8rem;
          
        }
        
        .text-section {
          flex: 1;
          max-width: 32rem;
        
        }
        
        .main-title {
          font-size: 10rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: #111;
          line-height: 0.9;
          letter-spacing: -0.02em;
          
        }
        
        .main-description {
          font-size: 1.25rem;
          color: #374151;
          margin-bottom: 8rem;
          line-height: 1.6;
          max-width: 28rem;
        }
        

        .blob-btn {
          z-index: 1;
          position: relative;
          padding: 20px 46px;
          margin-bottom: 30px;
          text-align: center;
          text-transform: uppercase;
          color: #13a905ff;
          font-size: 16px;
          font-weight: bold;
          background-color: transparent;
          outline: none;
          border: none;
          transition: color 0.5s;
          cursor: pointer;
          border-radius: 30px;
        }
        .blob-btn:before {
          content: "";
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #13a905ff;
          border-radius: 30px;
          pointer-events: none;
        }
        .blob-btn:after {
          content: "";
          z-index: -2;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #13a905ff;
          border-radius: 30px;
          transition: all 0.3s 0.2s;
        }
        .blob-btn:hover {
          color: #fff;
          border-radius: 30px;
        }
        .blob-btn:hover:after {
          transition: all 0.3s;
          background: #13a905ff;
        }
        .blob-btn__inner {
          z-index: -1;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          background: #fff;
        }
        .blob-btn__blobs {
          position: relative;
          display: block;
          height: 100%;
          filter: url('#goo');
        }
        .blob-btn__blob {
          position: absolute;
          top: 2px;
          width: 25%;
          height: 100%;
          background: #13a905ff;
          border-radius: 100%;
          transform: translate3d(0,150%,0) scale(1.4);
          transition: transform 0.45s;
        }
        .blob-btn__blob:nth-child(1) { left: 0; transition-delay: 0s; }
        .blob-btn__blob:nth-child(2) { left: 30%; transition-delay: 0.08s; }
        .blob-btn__blob:nth-child(3) { left: 60%; transition-delay: 0.16s; }
        .blob-btn__blob:nth-child(4) { left: 90%; transition-delay: 0.24s; }
        .blob-btn:hover .blob-btn__blob {
          transform: translateZ(0) scale(1.4);
        }
        
        .illustration-section {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          
        }
        
        .illustration-container {
          position: relative;
          max-width: 35rem;
        }
        
        .main-illustration {
          width: 110%;
          height: auto;
          object-fit: contain;
        }
        
        @media (max-width: 1024px) {
          .main-content {
            flex-direction: column;
            text-align: center;
            gap: 3rem;
          }
          
          .text-section {
            max-width: 100%;
          }
          
          .main-title {
            font-size: 6rem;
          }
          
          .illustration-section {
            justify-content: center;
          }
        }
        
        @media (max-width: 768px) {
          .navigation {
            padding: 1rem 2rem;
          }
          
          .nav-links {
            gap: 2rem;
          }
          
          .nav-link {
            font-size: 1rem;
          }
          
          .main-content {
            padding: 2rem;
          }
          
          .main-title {
            font-size: 4rem;
          }
          
          .main-description {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}
