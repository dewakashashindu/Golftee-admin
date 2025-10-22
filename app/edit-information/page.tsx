"use client";
import { useState, useRef } from "react";
import Link from "next/link";

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Inactive" | "Suspended";
  profilePicture: string | null;
}


export default function EditInformation() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+94 77 569 8201",
    status: "Active",
    profilePicture: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Profile updated:", profileData);
    alert("Profile information updated successfully!");
  };

  const handleProfilePictureUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prevState => ({
          ...prevState,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfileData(prevState => ({
      ...prevState,
      profilePicture: null
    }));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      console.log("Account deleted");
      alert("Account has been deleted!");
    }
  };

  // Close dropdown when clicking outside
  // (Optional: for now, just close on nav click)

  return (
    <div className="edit-information-container">
      <title>Edit Profile Information</title>
      
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      {/* Top Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <a href="/home" className="nav-link">Home</a>
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
                      <p className="notification-text">Profile updated successfully</p>
                      <span className="notification-time">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-text">Password change requested</p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-text">Account verification completed</p>
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
          <div className="nav-link nav-dropdown" onClick={() => setShowSettingsDropdown((v) => !v)} tabIndex={0} onBlur={() => setShowSettingsDropdown(false)} style={{ position: 'relative' }}>
            <span>Settings <span className={`dropdown-arrow${showSettingsDropdown ? ' open' : ''}`}>▼</span></span>
            {showSettingsDropdown && (
              <div className="dropdown-menu" tabIndex={-1}>
                <Link href="/reset-password" className="dropdown-item">
                  <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Reset Password
                </Link>
                <Link href="/edit-information" className="dropdown-item">
                  <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Edit Profile
                </Link>
              </div>
            )}
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
        <div className="page-header">
          <h1 className="page-title">Edit Profile Information</h1>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-picture-section">
          <div className="profile-picture-container">
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
            ) : (
              <div className="profile-picture-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#ccc">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="profile-picture-actions">
            <button type="button" onClick={handleProfilePictureUpload} className="upload-btn">
              {profileData.profilePicture ? "Change Picture" : "Upload Picture"}
            </button>
            {profileData.profilePicture && (
              <button type="button" onClick={handleRemoveProfilePicture} className="remove-btn">
                Remove Picture
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Account Status:</label>
          <select
            id="status"
            name="status"
            value={profileData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          
          <button type="button" onClick={handleDeleteAccount} className="delete-account-btn">
            Delete Account
          </button>
          </div>
          </form>
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
              <li><Link href="/home" className="footer-link">Dashboard</Link></li>
              <li><Link href="/bookings" className="footer-link">Bookings</Link></li>
              <li><Link href="/analytics" className="footer-link">Analytics</Link></li>
              <li><a href="#" className="footer-link">Tournaments</a></li>
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
                type="button"
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
        .edit-information-container {
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
          user-select: none;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          margin-left: 0.3rem;
          transition: transform 0.2s;
          display: inline-block;
        }
        .dropdown-arrow.open {
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
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
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
          text-decoration: none;
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
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }

        .form-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-form {
          padding: 2.5rem;
        }

        .profile-picture-section {
          text-align: center;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f3f4f6;
        }

        .profile-picture-container {
          width: 140px;
          height: 140px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #b8e6c1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafb;
          box-shadow: 0 4px 16px rgba(184, 230, 193, 0.3);
        }

        .profile-picture {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-picture-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-picture-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .upload-btn, .remove-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .upload-btn {
          background: #16a34a;
          color: white;
        }

        .upload-btn:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .remove-btn {
          background: #dc2626;
          color: white;
        }

        .remove-btn:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #374151;
          font-size: 1rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
          transition: all 0.2s;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid #f3f4f6;
        }

        .save-btn {
          background: #16a34a;
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .save-btn:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);
        }

        .delete-account-btn {
          background: #dc2626;
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .delete-account-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
        }

        @media (max-width: 1200px) {
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
        }

        @media (max-width: 800px) {
          .navigation {
            flex-direction: column;
            gap: 1.2rem;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .nav-link {
            font-size: 1rem;
            padding: 0.4rem 0.8rem;
          }

          .notification-card {
            width: 280px;
            left: 0;
            transform: none;
          }

          .profile-card {
            width: 260px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
          }

          .main-content {
            padding: 1rem 0.5rem 2rem 0.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .profile-form {
            padding: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .profile-picture-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .profile-picture-container {
            width: 120px;
            height: 120px;
          }
        }

        /* Footer Styles */
        .footer-section {
          background: linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%);
          position: relative;
          z-index: 10;
          margin-top: 5rem;
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