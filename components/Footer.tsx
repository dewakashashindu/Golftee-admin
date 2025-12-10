"use client";
import { useState } from "react";

export default function Footer() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  return (
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
            <li><a href="/equipment" className="footer-link">Equipment</a></li>
            <li><a href="#" className="footer-link">Member Management</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-section-title">Support & Legal</h3>
          <ul className="footer-link-list">
            <li><a href="#" className="footer-link">Help Center</a></li>
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

      <style jsx>{`
        /* Footer Styles */
        .footer-section {
          background: linear-gradient(135deg, #15241aff 0%, #0F7C6D 100%);
          position: relative;
          z-index: 1;
          margin-top: 10rem;
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
        
        .star {
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s;
          filter: grayscale(100%);
          opacity: 0.6;
        }
        
        .star.active {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.1);
        }
        
        .star:hover {
          transform: scale(1.2);
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
          background: linear-gradient(90deg, #000000ff 0%, #062411ff 100%);
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
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem 2rem 1.5rem;
          }
          
          .footer-about {
            max-width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1rem 1.5rem;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
            padding: 1.5rem 1rem;
          }
          
          .social-icons {
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            padding: 1.5rem 0.75rem 1rem;
          }
          
          .footer-bottom {
            padding: 1rem 0.75rem;
          }
          
          .social-icons {
            gap: 0.75rem;
          }
          
          .social-icon {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </footer>
  );
}