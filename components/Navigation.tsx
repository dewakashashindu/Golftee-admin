"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuthToken } from '@/lib/auth';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push('/login');
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="navigation" onClick={() => showMobileMenu && setShowMobileMenu(false)}>
        <div className="nav-container">
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className="hamburger-menu"
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileMenu(!showMobileMenu);
            }}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${showMobileMenu ? 'mobile-active' : ''}`}>
            <a href="/home" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Home</a>
          <div 
            className="nav-link nav-dropdown" 
            onClick={(e) => {
              e.stopPropagation();
              setShowBookingsDropdown((v) => !v);
            }}
            onMouseLeave={() => setShowBookingsDropdown(false)}
            style={{ position: 'relative' }}
          >
            <span className={currentPage === 'bookings' || currentPage === 'equipment-bookings' ? 'active' : ''}>Bookings</span>
            <div className="dropdown-arrow">▼</div>
            {showBookingsDropdown && (
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <a href="/bookings" className="dropdown-item">
                  <span className="dropdown-icon">📅</span>
                  All Bookings
                </a>
                <a href="/equipment-bookings" className="dropdown-item">
                  <span className="dropdown-icon">🏌️</span>
                  Equipment Bookings
                </a>
              </div>
            )}
          </div>
          <a href="/analytics" className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}>Analytics</a>
          <a href="/equipment" className={`nav-link ${currentPage === 'equipment' ? 'active' : ''}`}>Equipment</a>
          <a href="/events" className={`nav-link ${currentPage === 'events' ? 'active' : ''}`}>Events</a>
          <a href="/support" className={`nav-link ${currentPage === 'support' ? 'active' : ''}`}>Support</a>
          <a href="/notifications" className="nav-link" style={{ position: 'relative' }} onClick={() => setShowMobileMenu(false)}>
            Notifications
            {/* Unread badge */}
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-12px',
              background: '#dc2626',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              zIndex: 2,
              minWidth: '22px',
              textAlign: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
            }}>3</span>
          </a>
          <div className="nav-link notification-section" onClick={(e) => {
            e.stopPropagation();
            setShowNotificationCard(!showNotificationCard);
          }}>
            <span>Quick View</span>
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
                      <p className="notification-text">Equipment maintenance completed</p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="notification-card-footer">
                  <button className="view-all-btn" onClick={() => window.location.href = '/notifications'}>View All</button>
                </div>
              </div>
            )}
          </div>
          <div className="nav-link nav-dropdown" onClick={(e) => {
            e.stopPropagation();
            setShowSettingsDropdown((v) => !v);
          }} tabIndex={0} onBlur={() => setShowSettingsDropdown(false)} style={{ position: 'relative' }}>
            <span>Settings</span>
            <div className="dropdown-arrow">▼</div>
            {showSettingsDropdown && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = '/edit-information';
                  }}
                >
                  <span className="dropdown-icon">👤</span>
                  Edit Information
                </div>
                <a href="/privacy-policy" className="dropdown-item">
                  <span className="dropdown-icon">🔒</span>
                  Privacy Policy
                </a>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    window.location.href = '/reset-password';
                  }}
                >
                  <span className="dropdown-icon">🔑</span>
                  Reset Password
                </div>
                <div className="dropdown-item" onClick={() => {
                  handleLogout();
                }}>
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </div>
              </div>
            )}
          </div>
          </div>
        
          {/* Profile Section */}
        <div className="profile-section" onClick={(e) => {
          e.stopPropagation();
          setShowProfileCard(!showProfileCard);
        }}>
          <div className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75z" />
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
                <button className="profile-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </nav>

      <style jsx>{`
        .navigation {
          background: rgba(255, 255, 255, 0);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 2rem 3.5rem 1.5rem 3.5rem;
          position: relative;
          z-index: 1001;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
          flex-wrap: wrap;
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

        .nav-link:hover, .nav-link.active {
          background: linear-gradient(135deg, #37e663ff 0%, #085014ff 100%);
          color: white;
          transform: translateY(-1px);
        }

        .nav-dropdown {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.2s;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          z-index: 1002;
          overflow: hidden;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #374151;
          text-decoration: none;
          transition: background-color 0.2s;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #f3f4f6;
        }

        .dropdown-icon {
          font-size: 1rem;
        }

        .notification-section {
          position: relative;
        }

        .notification-card {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          width: 350px;
          z-index: 1002;
          overflow: hidden;
        }

        .notification-card-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .notification-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
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
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
        }

        .notification-item:hover {
          background-color: #f9fafb;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-text {
          font-size: 0.9rem;
          color: #374151;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }

        .notification-time {
          font-size: 0.8rem;
          color: #6b7280;
        }

        .notification-card-footer {
          padding: 0.75rem 1.25rem;
          background: #f9fafb;
          border-top: 1px solid #f3f4f6;
        }

        .view-all-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

        /* Hamburger Menu */
        .hamburger-menu {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1003;
        }

        .hamburger-menu span {
          width: 25px;
          height: 3px;
          background: #111;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger-menu:hover span {
          background: #37e663;
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .navigation {
            padding: 1.8rem 3rem 1.3rem 3rem;
          }
          .nav-links {
            gap: 2.5rem;
          }
          .nav-link {
            font-size: 1.25rem;
          }
          .profile-name {
            font-size: 1rem;
          }
        }

        @media (max-width: 1200px) {
          .navigation {
            padding: 1.5rem 2.5rem 1.2rem 2.5rem;
          }
          .nav-links {
            gap: 2rem;
          }
          .nav-link {
            font-size: 1.15rem;
            padding: 0.4rem 0.8rem;
          }
        }

        @media (max-width: 1024px) {
          .navigation {
            padding: 1.2rem 2rem 1rem 2rem;
          }
          .nav-links {
            gap: 1.5rem;
          }
          .nav-link {
            font-size: 1rem;
            padding: 0.4rem 0.7rem;
          }
          .notification-card {
            width: 300px;
          }
        }

        @media (max-width: 968px) {
          .navigation {
            padding: 1rem 1.5rem 0.8rem 1.5rem;
          }
          .nav-links {
            gap: 1.2rem;
            justify-content: center;
          }
          .nav-link {
            font-size: 0.95rem;
            padding: 0.3rem 0.6rem;
          }
        }

        @media (max-width: 800px) {
          .navigation {
            padding: 0.8rem 1rem;
          }
          .nav-container {
            flex-direction: row;
            gap: 1rem;
            justify-content: space-between;
            align-items: center;
          }
          .nav-links {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          .nav-link {
            font-size: 0.9rem;
            padding: 0.3rem 0.5rem;
          }
          .notification-card {
            width: 280px;
            right: -50px;
          }
          .profile-section {
            order: unset;
          }
          .profile-name {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .navigation {
            padding: 1rem 1rem 0.5rem 1rem;
          }

          .hamburger-menu {
            display: flex;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            gap: 0;
            padding: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 1002;
            border-radius: 0;
          }

          .nav-links.mobile-active {
            max-height: 600px;
            padding: 1rem 0;
          }

          .nav-link {
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
            width: 100%;
            text-align: left;
            border: none;
            margin: 0;
            border-radius: 0;
            transition: background 0.2s;
          }

          .nav-link:hover,
          .nav-link.active {
            background: rgba(55, 230, 99, 0.1);
            color: #111;
          }

          .nav-link.active {
            border-left: 3px solid #37e663;
            padding-left: calc(1.5rem - 3px);
          }

          .nav-dropdown {
            position: relative;
          }

          .dropdown-menu {
            position: static;
            background: #f9fafb;
            border: none;
            border-top: 1px solid #e5e7eb;
            border-radius: 0;
            box-shadow: none;
            min-width: unset;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }

          .nav-dropdown.active .dropdown-menu {
            max-height: 300px;
          }

          .dropdown-item {
            padding: 0.75rem 1.5rem 0.75rem 2rem;
            border-bottom: 1px solid #e5e7eb;
            font-size: 1rem;
          }

          .dropdown-item:last-child {
            border-bottom: none;
          }

          .notification-card {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: auto;
            max-height: 60vh;
            border-radius: 12px 12px 0 0;
            border: none;
            border-top: 1px solid #e5e7eb;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1003;
            animation: slideUp 0.3s ease;
          }

          .notification-card-body {
            max-height: 40vh;
          }

          .profile-section {
            display: flex;
            gap: 0.5rem;
            padding: 0;
            background: none;
          }

          .profile-name {
            display: none;
          }

          .profile-card {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: auto;
            max-height: 60vh;
            border-radius: 12px 12px 0 0;
            border: none;
            border-top: 1px solid #e5e7eb;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1003;
            margin-top: 0;
            animation: slideUp 0.3s ease;
          }

          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }

        @media (max-width: 640px) {
          .navigation {
            padding: 0.8rem 0.8rem 0.4rem 0.8rem;
          }

          .nav-link {
            font-size: 0.95rem;
            padding: 0.7rem 1.2rem;
          }

          .profile-icon {
            width: 2rem;
            height: 2rem;
          }

          .profile-icon svg {
            width: 20px;
            height: 20px;
          }

          .dropdown-item {
            padding: 0.65rem 1.2rem 0.65rem 1.8rem;
            font-size: 0.95rem;
          }

          .dropdown-icon {
            font-size: 0.9rem;
          }

          .notification-card,
          .profile-card {
            border-radius: 16px 16px 0 0;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            padding: 0.6rem 0.6rem 0.3rem 0.6rem;
          }

          .hamburger-menu span {
            width: 22px;
            height: 2.5px;
          }

          .nav-links {
            max-height: 500px;
            padding: 0.8rem 0;
          }

          .nav-link {
            font-size: 0.9rem;
            padding: 0.65rem 1rem;
          }

          .nav-link.active {
            padding-left: calc(1rem - 3px);
          }

          .profile-icon {
            width: 1.8rem;
            height: 1.8rem;
          }

          .profile-icon svg {
            width: 18px;
            height: 18px;
          }

          .dropdown-item {
            padding: 0.6rem 1rem 0.6rem 1.6rem;
            font-size: 0.9rem;
          }

          .notification-item {
            padding: 0.8rem 1rem;
          }

          .notification-text {
            font-size: 0.85rem;
          }

          .notification-time {
            font-size: 0.75rem;
          }

          .profile-card-title {
            font-size: 1rem;
          }

          .profile-card-email,
          .profile-card-phone {
            font-size: 0.85rem;
          }

          .profile-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 360px) {
          .navigation {
            padding: 0.5rem;
          }

          .nav-link {
            font-size: 0.85rem;
            padding: 0.6rem 0.8rem;
          }

          .nav-link.active {
            padding-left: calc(0.8rem - 3px);
          }

          .profile-icon {
            width: 1.6rem;
            height: 1.6rem;
          }

          .profile-icon svg {
            width: 16px;
            height: 16px;
          }

          .dropdown-item {
            padding: 0.5rem 0.8rem 0.5rem 1.4rem;
            font-size: 0.85rem;
          }

          .dropdown-icon {
            font-size: 0.8rem;
          }

          .notification-item {
            padding: 0.7rem 0.8rem;
          }

          .notification-text {
            font-size: 0.8rem;
          }

          .profile-card {
            width: 90vw;
          }

          .profile-card-title {
            font-size: 0.95rem;
          }

          .profile-btn {
            padding: 0.45rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}