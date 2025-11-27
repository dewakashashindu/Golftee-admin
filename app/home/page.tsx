"use client";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../../components/Navigation";
const sampleNotifications = [
  { id: '1', isRead: false },
  { id: '2', isRead: false },
  { id: '3', isRead: true },
  { id: '4', isRead: true },
  { id: '5', isRead: false },
  { id: '6', isRead: true },
  { id: '7', isRead: false },
  { id: '8', isRead: true },
];

export default function HomePage() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  return (
    <div className="main-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <Navigation currentPage="home" />
      
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
                <button className="profile-btn logout-btn" onClick={() => window.location.href = '/login'}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Text Content */}
        <div className="text-section">
          <h1 className="main-title">GolfTee</h1>
          <p className="main-description">
            Manage players, tournaments, and club activities all in one place. Stay on top of game stats, schedules, and performance insights with ease.
          </p>
          
          <div className="button-group">
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
            
            <Link href="/events" className="events-button">
              <button className="blob-btn">
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
                Manage Events
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                  <defs>
                    <filter id="goo2"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/><feBlend in="SourceGraphic" in2="goo"/></filter>
                  </defs>
                </svg>
              </button>
            </Link>
          </div>
          
        </div>
        
        {/* Right Side - Illustration */}
        <div className="illustration-section">
          <div className="illustration-container">
            <img src="/main.png" alt="Dashboard Analytics Illustration" className="main-illustration" />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-column footer-about">
            <div className="footer-logo-container">
              <img 
              src="/icon.png" 
              alt="GolfTee logo featuring a stylized golf ball and tee, set against a green background representing a golf course. The logo conveys a professional and welcoming atmosphere. If text is present, it reads GolfTee." 
              className="footer-logo" 
              />
            </div>
            <h2 className="footer-brand">GolfTee</h2>
            <p className="footer-tagline">Golf Club Management System</p>
            
            <h3 className="footer-section-title">About Us</h3>
            <p className="footer-description">
              Complete golf management solution for clubs, tournaments, and player analytics. Streamline your operations with our comprehensive admin portal.
            </p>
            
            <div className="footer-contact">
              <h3 className="footer-section-title">Support</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">+94 77 569 8201</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-text">support@golftee.com</span>
              </div>
            </div>
            
            <div className="footer-social">
              <h3 className="footer-section-title">Follow Us</h3>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/94775698201" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.372-.26.297-.99.967-.99 2.357 0 1.388 1.014 2.732 1.155 2.927.141.196 1.989 3.038 4.823 4.26.675.292 1.203.466 1.613.596.677.215 1.293.184 1.78.112.544-.081 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
                <a href="mailto:support@golftee.com" className="social-icon email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-section-title">Management</h3>
            <ul className="footer-link-list">
              <li><a href="/home" className="footer-link">Dashboard</a></li>
              <li><a href="/bookings" className="footer-link">Bookings</a></li>
              <li><a href="/analytics" className="footer-link">Analytics</a></li>
              <li><a href="#" className="footer-link">Tournaments</a></li>
              <li><a href="#" className="footer-link">Member Management</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-section-title">Support & Legal</h3>
            <ul className="footer-link-list">
              <li><a href="/support" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Contact Support</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column footer-review">
            <h3 className="footer-section-title">Send Review & Rating</h3>
            <p className="review-description">
              Share your experience with GolfTee Admin Portal and help us improve our services.
            </p>
            <div className="review-form">
              <div className="rating-section">
                <label className="rating-label">Your Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <textarea 
                placeholder="Write your review here..." 
                className="review-textarea"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button 
                className="review-btn"
                onClick={() => {
                  if (rating > 0 && review.trim()) {
                    alert(`Thank you for your ${rating}-star review: "${review}"`);
                    setRating(0);
                    setReview("");
                  } else {
                    alert("Please provide both a rating and review before submitting.");
                  }
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-brand-icon">
            <span className="brand-icon">🏌️‍♂️</span>
            <span className="brand-text">golftee-admin.com</span>
          </div>
          <p className="footer-copyright">
            2025 © GolfTee Admin Portal. All rights reserved.
          </p>
        </div>
      </footer>
      
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
          bottom: 150px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 0.8;
          z-index: 0;
        }
        
        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem 3.5rem 1.5rem 3.5rem;
          position: relative;
          z-index: 1001;
        }
        
        .nav-links {
          display: flex;
          gap: 3rem;
        }
        
        .nav-link {
          font-size: 1.35rem;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.2s;
          position: relative;
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
          margin-bottom: 4rem;
          line-height: 1.6;
          max-width: 28rem;
        }
        
        .button-group {
          display: flex;
          gap: 2rem;
          margin-bottom: 4rem;
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
          align-items: flex-end;
          position: relative;
        }
        
        .illustration-container {
          position: absolute;
          bottom: -250;
          right: 0;
          max-width: 35rem;
        }
        
        .main-illustration {
          width: 110%;
          height: auto;
          object-fit: contain;
        }

        /* Footer Styles */
        .footer-section {
          background: linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%);
          position: relative;
          z-index: 10;
          margin-top: 9rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 -4px 20px rgba(19, 169, 5, 0.2);
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 3rem;
          padding: 3rem 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-column {
          display: flex;
          flex-direction: column;
        }
        
        .footer-about {
          max-width: 350px;
        }
        
        .footer-logo-container {
          background: white;
          border-radius: 8px;
          padding: 0.75rem;
          margin-bottom: 1rem;
          display: inline-block;
          width: fit-content;
        }
        
        .footer-logo {
          width: 80px;
          height: auto;
          display: block;
        }
        
        .footer-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0.5rem 0 0 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .footer-tagline {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0.25rem 0 1.5rem 0;
        }
        
        .footer-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #b8e6c1;
          margin: 0 0 1rem 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .footer-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .footer-contact {
          margin-top: 1rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .contact-icon {
          font-size: 1rem;
        }
        
        .contact-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .footer-social {
          margin-top: 2rem;
        }
        
        .social-icons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .social-icon:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(184, 230, 193, 0.3);
          color: white;
        }
        
        .social-icon.facebook:hover {
          background: #1877f2;
          border-color: #1877f2;
        }
        
        .social-icon.instagram:hover {
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
          border-color: #e6683c;
        }
        
        .social-icon.whatsapp:hover {
          background: #25d366;
          border-color: #25d366;
        }
        
        .social-icon.email:hover {
          background: #b8e6c1;
          border-color: #b8e6c1;
          color: #0f7a04;
        }
        
        .social-icon svg {
          width: 20px;
          height: 20px;
        }
        
        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-link-list li {
          margin-bottom: 0.75rem;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }
        
        .footer-link:hover {
          color: #b8e6c1;
          text-decoration: none;
        }
        
        .footer-review {
          
        }
        
        .review-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          margin: 0 0 1rem 0;
        }
        
        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .rating-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .rating-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        .star-rating {
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }
        
        const unreadCount = sampleNotifications.filter(n => !n.isRead).length;
        return (
          <div className="main-container">
            {/* Background Circles */}
            <div className="bg-circle-left" />
            <div className="bg-circle-right" />

              <div className="nav-links">
                <a href="/home" className="nav-link">Home</a>
                <a href="/bookings" className="nav-link">Bookings</a>
                <a href="/notifications" className="nav-link" style={{ position: 'relative' }}>
                  Notifications
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-18px',
                      background: '#dc2626',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      minWidth: '24px',
                      textAlign: 'center',
                      zIndex: 2
                    }}>{unreadCount}</span>
                  )}
                </a>
                <div className="nav-link notification-section" onClick={() => setShowNotificationCard(!showNotificationCard)}>
                  <span>Quick View</span>
                  {showNotificationCard && (
                    <div className="notification-card">
        
        .review-textarea {
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          min-height: 80px;
          backdrop-filter: blur(10px);
        }
        
        .review-textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .review-textarea:focus {
          outline: none;
          border-color: #b8e6c1;
          box-shadow: 0 0 0 2px rgba(184, 230, 193, 0.3);
        }
        
        .review-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .review-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: #b8e6c1;
          box-shadow: 0 4px 12px rgba(184, 230, 193, 0.3);
          transform: translateY(-2px);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%);
          color: #fff;
        }
        
        .footer-brand-icon {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .brand-icon {
          font-size: 1.2rem;
        }
        
        .brand-text {
          font-size: 0.95rem;
          color: #b8e6c1;
          font-weight: 500;
        }
        
        .footer-copyright {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
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

          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          
          .footer-about {
            grid-column: span 2;
            max-width: 100%;
          }
          
          .footer-bottom {
            padding: 1.5rem 2rem;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
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

          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .footer-about {
            grid-column: span 1;
          }
          
          .footer-brand {
            font-size: 1.3rem;
          }
          
          .footer-description {
            font-size: 0.85rem;
          }
          
          .review-form {
            max-width: 300px;
            margin: 0 auto;
          }
          
          .star-rating {
            justify-content: center;
          }
          
          .social-icons {
            justify-content: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}