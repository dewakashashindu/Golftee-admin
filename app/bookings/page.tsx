"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/bookings")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (mounted) setBookings(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return bookings.filter((booking: any) => {
      const bookingDate = new Date(booking.date);
      switch (filterType) {
        case "today":
          return booking.date === today.toISOString().split("T")[0];
        case "week":
          return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
        case "month":
          return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
        case "custom":
          return customDate ? booking.date === customDate : true;
        default:
          return true;
      }
    });
  }, [bookings, filterType, customDate]);

  return (
    <div className="bookings-container">
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />

      <Navigation currentPage="bookings" />

      <div className="main-content">
        <div className="page-header">
          <div className="header-top">
            <h1 className="page-title">
              {filterType === "all" && "All Bookings"}
              {filterType === "today" && "Today's Bookings"}
              {filterType === "week" && "This Week's Bookings"}
              {filterType === "month" && "This Month's Bookings"}
              {filterType === "custom" && customDate && `Bookings for ${new Date(customDate).toLocaleDateString()}`}
              {filterType === "custom" && !customDate && "Custom Date Bookings"}
            </h1>

            <div className="filter-dropdown">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                <option value="all">All Bookings</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>
          </div>

          {filterType === "custom" && (
            <div className="custom-date-section">
              <input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} className="date-input" />
              {customDate && (
                <button className="clear-date-btn" onClick={() => setCustomDate("")}>Clear</button>
              )}
            </div>
          )}

          <div className="results-count">Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="table-container">
          {loading && <div>Loading bookings…</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              <table className="bookings-table">
                <thead>
                  <tr className="table-header">
                    <th>Full Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>No. Players</th>
                    <th>Non Players</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking: any) => (
                    <tr key={booking.id} className="table-row">
                      <td>{booking.fullName}</td>
                      <td>{booking.date}</td>
                      <td>{booking.startTime}</td>
                      <td>{booking.endTime}</td>
                      <td>{booking.noPlayers}</td>
                      <td>{booking.nonPlayers}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phoneNo}</td>
                      <td>
                        <span className={`status-badge ${booking.status?.toLowerCase?.()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mobile-booking-cards">
                {filteredBookings.map((booking: any) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-card-header">
                      <div className="booking-card-name">{booking.fullName}</div>
                      <span className={`status-badge ${booking.status?.toLowerCase?.()}`}>{booking.status}</span>
                    </div>
                    <div className="booking-card-details">
                      <div className="booking-detail">
                        <span className="booking-detail-label">Date</span>
                        <span className="booking-detail-value">{booking.date}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail-label">Time</span>
                        <span className="booking-detail-value">{booking.startTime} - {booking.endTime}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail-label">Players</span>
                        <span className="booking-detail-value">{booking.noPlayers}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail-label">Non-Players</span>
                        <span className="booking-detail-value">{booking.nonPlayers}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail-label">Email</span>
                        <span className="booking-detail-value">{booking.email}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail-label">Phone</span>
                        <span className="booking-detail-value">{booking.phoneNo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-column footer-about">
            <div className="footer-logo-container">
              <img src="/icon.png" alt="GolfTee Logo" className="footer-logo" />
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
              <li><a href="/" className="footer-link">Dashboard</a></li>
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
        .bookings-container {
          min-height: 100vh;
          background: #f0f0f0;
          position: relative;
          overflow: hidden;
          padding: 0 0 4rem 0;
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
          bottom: 150px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
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
          align-items: center;
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
        .nav-link:hover {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.05);
        }
        .nav-dropdown {
          position: relative;
        }
        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-arrow {
          font-size: 0.8rem;
          margin-left: 0.3rem;
          transition: transform 0.2s;
        }
        .nav-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s;
          z-index: 100;
          border: 1px solid #e5e7eb;
          margin-top: 0.5rem;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dropdown-item:hover {
          background: #f3f4f6;
          color: #16a34a;
        }
        .dropdown-item:first-child {
          border-radius: 8px 8px 0 0;
        }
        .dropdown-item:last-child {
          border-radius: 0 0 8px 8px;
        }
        .dropdown-icon {
          color: currentColor;
        }
        .notification-section {
          position: relative;
        }
        .notification-card {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          z-index: 100;
          border: 1px solid #e5e7eb;
          margin-top: 0.5rem;
        }
        .notification-card-header {
          padding: 1rem 1.25rem 0.5rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .notification-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0;
        }
        .notification-card-body {
          max-height: 300px;
          overflow-y: auto;
        }
        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid #f9fafb;
        }
        .notification-item:last-child {
          border-bottom: none;
        }
        .notification-dot {
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }
        .notification-content {
          flex: 1;
        }
        .notification-text {
          font-size: 0.9rem;
          color: #374151;
          margin: 0 0 0.2rem 0;
          line-height: 1.4;
        }
        .notification-time {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .notification-card-footer {
          padding: 0.75rem 1.25rem;
          display: flex;
          gap: 0.5rem;
          border-top: 1px solid #f3f4f6;
        }
        .notification-btn {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #d1d5db;
        }
        .view-all-btn {
          background: white;
          color: #374151;
        }
        .view-all-btn:hover {
          background: #f9fafb;
          border-color: #16a34a;
          color: #16a34a;
        }
        .mark-read-btn {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }
        .mark-read-btn:hover {
          background: #15803d;
        }
        .profile-section {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.1rem;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          position: relative;
        }
        .profile-icon {
          width: 40px;
          height: 40px;
          background: #16a34a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
        }
        .profile-name {
          font-weight: 500;
        }
        .profile-card {
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          z-index: 1002;
          border: 1px solid #e5e7eb;
          margin-top: 0.5rem;
        }
        .profile-card-header {
          background: #16a34a;
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
          text-align: center;
        }
        .profile-card-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .profile-card-body {
          padding: 1.5rem;
          text-align: center;
        }
        .profile-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 0.5rem 0;
        }
        .profile-card-email {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0 0 0.3rem 0;
        }
        .profile-card-phone {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0;
        }
        .profile-card-footer {
          padding: 1rem 1.5rem;
          display: flex;
          gap: 0.75rem;
          border-top: 1px solid #f3f4f6;
        }
        .profile-btn {
          flex: 1;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cancel-btn {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }
        .cancel-btn:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        .logout-btn {
          background: #dc2626;
          color: white;
          border: 1px solid #dc2626;
        }
        .logout-btn:hover {
          background: #b91c1c;
        }
        .main-content {
          position: relative;
          z-index: 10;
          padding: 1rem 3.5rem 2rem 3.5rem;
        }
        .page-header {
          margin-bottom: 2rem;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }
        .filter-dropdown {
          position: relative;
        }
        .filter-select {
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          background: white;
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          min-width: 180px;
        }
        .filter-select:hover {
          border-color: #16a34a;
          background-color: #f0fdf4;
        }
        .filter-select:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
        .custom-date-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .date-input {
          padding: 0.6rem 1rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
          background: white;
        }
        .date-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
        .clear-date-btn {
          padding: 0.6rem 1rem;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }
        .clear-date-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }
        .results-count {
          font-size: 0.95rem;
          color: #6b7280;
          font-weight: 500;
          padding: 0.75rem 1rem;
          background: #f9fafb;
          border-radius: 6px;
          border-left: 3px solid #16a34a;
        }
        .table-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
        }
        .table-header {
          background: #b8e6c1;
        }
        .table-header th {
          padding: 1rem 1.5rem;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: #111;
          border-right: 1px solid #a3d9a5;
        }
        .table-header th:last-child {
          border-right: none;
        }
        .table-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s;
        }
        .table-row:hover {
          background: #f9fafb;
        }
        .table-row:last-child {
          border-bottom: none;
        }
        .table-row td {
          padding: 1.2rem 1.5rem;
          font-size: 0.9rem;
          color: #374151;
          border-right: 1px solid #f3f4f6;
        }
        .table-row td:last-child {
          border-right: none;
        }
        .status-badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .status-badge.confirmed {
          background: #dcfce7;
          color: #16a34a;
        }
        .status-badge.pending {
          background: #fef3c7;
          color: #d97706;
        }
        .status-badge.cancelled {
          background: #fee2e2;
          color: #dc2626;
        }
        @media (max-width: 1400px) {
          .main-content {
            padding: 1rem 2.5rem 2rem 2.5rem;
          }
        }

        @media (max-width: 1200px) {
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
          .table-container {
            overflow-x: auto;
          }
          .page-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 1024px) {
          .navigation {
            padding: 2rem 2.5rem 1.2rem 2.5rem;
          }
          .nav-links {
            gap: 2.5rem;
          }
          .nav-link {
            font-size: 1.25rem;
          }
          .main-content {
            padding: 1rem 1.5rem 2rem 1.5rem;
          }
          .page-title {
            font-size: 2rem;
          }
          .table-row td {
            padding: 1rem 1.2rem;
            font-size: 0.85rem;
          }
          .table-header th {
            padding: 0.9rem 1.2rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 968px) {
          .navigation {
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem 1rem;
          }
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
          .nav-link {
            font-size: 1.1rem;
            padding: 0.45rem 0.9rem;
          }
          .notification-card {
            width: 300px;
            left: 0;
            transform: none;
          }
          .profile-card {
            width: 270px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
          }
          .header-top {
            flex-direction: column;
            align-items: stretch;
            gap: 1.2rem;
          }
          .filter-select {
            width: 100%;
            min-width: auto;
          }
          .table-container {
            border-radius: 8px;
          }
        }

        @media (max-width: 800px) {
          .navigation {
            gap: 1.2rem;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
          }
          .nav-links {
            gap: 1rem;
          }
          .nav-link {
            font-size: 1rem;
            padding: 0.4rem 0.8rem;
          }
          .notification-card {
            width: 280px;
          }
          .profile-card {
            width: 260px;
          }
          .main-content {
            padding: 1rem 0.5rem 2rem 0.5rem;
          }
          .page-title {
            font-size: 1.8rem;
          }
          .custom-date-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          /* Enhanced Table Responsiveness */
          .table-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          }
          
          .bookings-table {
            min-width: 800px;
          }
          
          .table-row td {
            padding: 0.8rem 0.8rem;
            font-size: 0.8rem;
            white-space: nowrap;
          }
          
          .table-header th {
            padding: 0.8rem 0.8rem;
            font-size: 0.85rem;
            white-space: nowrap;
          }

          .status-badge {
            padding: 0.25rem 0.6rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 640px) {
          .page-title {
            font-size: 1.6rem;
          }

          .results-count {
            font-size: 0.85rem;
            padding: 0.6rem 0.8rem;
          }

          /* Mobile Table Optimization */
          .table-container {
            background: transparent;
            box-shadow: none;
          }

          .bookings-table {
            display: none;
          }

          /* Card-based layout for mobile */
          .mobile-booking-cards {
            display: block;
            gap: 1rem;
          }

          /* Default mobile cards hidden */
        }

        /* Mobile booking cards styles (default hidden) */
        .mobile-booking-cards {
          display: none;
        }

        @media (max-width: 640px) {
          .mobile-booking-cards {
            display: block;
          }

          .booking-card {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border-left: 4px solid #16a34a;
          }

          .booking-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #f3f4f6;
          }

          .booking-card-name {
            font-weight: 600;
            font-size: 1rem;
            color: #111;
          }

          .booking-card-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            font-size: 0.85rem;
          }

          .booking-detail {
            display: flex;
            flex-direction: column;
          }

          .booking-detail-label {
            font-weight: 500;
            color: #6b7280;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.2rem;
          }

          .booking-detail-value {
            color: #374151;
            font-weight: 500;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            padding: 1rem 0.3rem 0.8rem 0.3rem;
          }
          .nav-links {
            gap: 0.8rem;
          }
          .nav-link {
            font-size: 0.9rem;
            padding: 0.35rem 0.7rem;
          }
          .main-content {
            padding: 0.8rem 0.3rem 1.5rem 0.3rem;
          }
          .page-title {
            font-size: 1.4rem;
          }
          .filter-select {
            padding: 0.6rem 2rem 0.6rem 0.8rem;
            font-size: 0.9rem;
          }
          .date-input {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
          }
          .clear-date-btn {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
          }
          
          .booking-card {
            padding: 0.8rem;
          }
          
          .booking-card-name {
            font-size: 0.9rem;
          }
          
          .booking-card-details {
            grid-template-columns: 1fr;
            gap: 0.4rem;
          }
          
          .booking-detail {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .booking-detail-label {
            margin-bottom: 0;
            font-size: 0.7rem;
          }
          
          .booking-detail-value {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .page-title {
            font-size: 1.25rem;
          }
          .nav-link {
            font-size: 0.85rem;
            padding: 0.3rem 0.6rem;
          }
          .booking-card {
            padding: 0.7rem;
          }
          .booking-card-name {
            font-size: 0.85rem;
          }
        }

        /* Footer Styles */
        .footer-section {
          background: linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%);
          position: relative;
          z-index: 10;
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
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.3;
        }
        
        .star:hover,
        .star.active {
          opacity: 1;
          transform: scale(1.1);
        }
        
        .star:hover ~ .star {
          opacity: 0.3;
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
          background: rgba(0, 0, 0, 0.2);
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
