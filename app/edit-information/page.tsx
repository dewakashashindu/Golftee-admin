"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Inactive" | "Suspended";
  profilePicture: string | null;
}


export default function EditInformation() {
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
      
      <Navigation currentPage="edit-information" />

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

      <Footer />
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

        /* Responsive Breakpoints */
        @media (max-width: 1400px) {
          .navigation {
            padding: 2.2rem 3rem 1.3rem 3rem;
          }
          .nav-links {
            gap: 2.5rem;
          }
          .nav-link {
            font-size: 1.3rem;
            padding: 0.45rem 0.9rem;
          }
          .main-content {
            padding: 1rem 3rem 2rem 3rem;
          }
          .page-title {
            font-size: 2.3rem;
          }
          .form-container {
            max-width: 750px;
          }
        }

        @media (max-width: 1200px) {
          .navigation {
            padding: 2rem 2.5rem 1.2rem 2.5rem;
          }
          .nav-links {
            gap: 2rem;
          }
          .nav-link {
            font-size: 1.25rem;
            padding: 0.4rem 0.85rem;
          }
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
          .page-title {
            font-size: 2.2rem;
          }
          .form-container {
            max-width: 700px;
          }
          .profile-form {
            padding: 2.2rem;
          }
        }

        @media (max-width: 1024px) {
          .navigation {
            padding: 1.8rem 2rem 1.1rem 2rem;
          }
          .nav-links {
            gap: 1.8rem;
          }
          .nav-link {
            font-size: 1.2rem;
            padding: 0.4rem 0.8rem;
          }
          .main-content {
            padding: 1rem 1.5rem 2rem 1.5rem;
          }
          .page-title {
            font-size: 2.1rem;
          }
          .form-container {
            max-width: 650px;
          }
          .profile-picture-container {
            width: 130px;
            height: 130px;
          }
        }

        @media (max-width: 968px) {
          .navigation {
            padding: 1.6rem 1.5rem 1rem 1.5rem;
          }
          .nav-links {
            gap: 1.5rem;
          }
          .nav-link {
            font-size: 1.15rem;
            padding: 0.4rem 0.75rem;
          }
          .main-content {
            padding: 1rem 1.2rem 2rem 1.2rem;
          }
          .page-title {
            font-size: 2rem;
          }
          .form-container {
            max-width: 600px;
          }
          .profile-form {
            padding: 2rem;
          }
          .profile-picture-container {
            width: 125px;
            height: 125px;
          }
        }

        @media (max-width: 800px) {
          .navigation {
            gap: 1.2rem;
            padding: 1.2rem 0.8rem 1rem 0.8rem;
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
            padding: 1rem 0.8rem 2rem 0.8rem;
          }
          .page-title {
            font-size: 1.9rem;
          }
          .form-container {
            max-width: 95%;
          }
          .profile-form {
            padding: 1.8rem;
          }
          .profile-picture-container {
            width: 120px;
            height: 120px;
          }
          .form-actions {
            gap: 1.2rem;
          }
          .profile-picture-actions {
            gap: 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .navigation {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0.6rem 0.8rem 0.6rem;
          }
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
          }
          .nav-link {
            font-size: 0.95rem;
            padding: 0.35rem 0.7rem;
          }
          .main-content {
            padding: 1rem 0.6rem 2rem 0.6rem;
          }
          .page-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 2rem;
          }
          .form-container {
            margin: 0;
            border-radius: 8px;
          }
          .profile-form {
            padding: 1.5rem;
          }
          .profile-picture-container {
            width: 110px;
            height: 110px;
          }
          .form-group label {
            font-size: 0.95rem;
          }
          .form-group input,
          .form-group select {
            padding: 0.9rem 1.1rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 640px) {
          .navigation {
            padding: 0.8rem 0.4rem 0.6rem 0.4rem;
          }
          .nav-links {
            gap: 0.6rem;
          }
          .nav-link {
            font-size: 0.9rem;
            padding: 0.3rem 0.6rem;
          }
          .main-content {
            padding: 1rem 0.4rem 2rem 0.4rem;
          }
          .page-title {
            font-size: 1.6rem;
          }
          .profile-form {
            padding: 1.2rem;
          }
          .profile-picture-container {
            width: 100px;
            height: 100px;
          }
          .profile-picture-actions {
            flex-direction: column;
            gap: 0.6rem;
          }
          .upload-btn, .remove-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-group input,
          .form-group select {
            padding: 0.8rem 1rem;
          }
          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }
          .save-btn, .delete-account-btn {
            padding: 0.9rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            padding: 0.6rem 0.2rem 0.4rem 0.2rem;
          }
          .nav-link {
            font-size: 0.85rem;
            padding: 0.25rem 0.5rem;
          }
          .main-content {
            padding: 0.8rem 0.2rem 1.5rem 0.2rem;
          }
          .page-title {
            font-size: 1.4rem;
          }
          .profile-form {
            padding: 1rem;
          }
          .profile-picture-container {
            width: 90px;
            height: 90px;
          }
          .form-group label {
            font-size: 0.9rem;
          }
          .form-group input,
          .form-group select {
            padding: 0.7rem 0.9rem;
            font-size: 0.9rem;
          }
          .upload-btn, .remove-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          .save-btn, .delete-account-btn {
            padding: 0.8rem 1.8rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 360px) {
          .page-title {
            font-size: 1.3rem;
          }
          .profile-form {
            padding: 0.8rem;
          }
          .profile-picture-container {
            width: 80px;
            height: 80px;
          }
          .form-group input,
          .form-group select {
            padding: 0.6rem 0.8rem;
            font-size: 0.85rem;
          }
          .save-btn, .delete-account-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
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