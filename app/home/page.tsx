"use client";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";


export default function HomePage() {
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

      <Footer />
      
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
        

        
        .main-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(1rem, 3vw, 3rem) clamp(1rem, 6vw, 8rem);
        }
        
        .text-section {
          flex: 1;
          max-width: 32rem;
        }
        
        .main-title {
          font-size: clamp(3.5rem, 12vw, 10rem);
          font-weight: 700;
          margin-bottom: 3rem;
          color: #111;
          line-height: 0.9;
          letter-spacing: -0.02em;
          word-break: break-word;
        }
        
        .main-description {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: #374151;
          margin-bottom: 4rem;
          line-height: 1.6;
          max-width: 28rem;
        }
        
        .button-group {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
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
          white-space: nowrap;
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
          min-width: 0;
        }
        
        .illustration-container {
          position: relative;
          right: 0;
          max-width: 35rem;
          width: 100%;
        }
        
        .main-illustration {
          width: min(100%, 560px);
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
          justify-content: center;
        }
        
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
            padding: 2rem;
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

          .button-group {
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
            gap: 1.5rem;
          }
          
          .main-title {
            font-size: 4rem;
          }
          
          .main-description {
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .button-group {
            width: 100%;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .blob-btn {
            width: min(100%, 320px);
            margin-bottom: 0;
            padding: 14px 24px;
            font-size: 14px;
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

        @media (max-width: 640px) {
          .main-content {
            padding: 1rem;
          }

          .main-title {
            margin-bottom: 1.5rem;
          }

          .main-description {
            margin-bottom: 1.5rem;
          }

          .blob-btn {
            width: 100%;
            max-width: 100%;
          }

          .illustration-container {
            max-width: 22rem;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 0.75rem;
          }

          .button-group {
            gap: 0.75rem;
          }

          .blob-btn {
            font-size: 13px;
            padding: 12px 18px;
          }

          .illustration-container {
            max-width: 18rem;
          }
        }
      `}</style>
    </div>
  );
}