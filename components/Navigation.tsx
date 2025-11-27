"use client";
import { useState } from 'react';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <a href="/home" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Home</a>
          <a href="/bookings" className={`nav-link ${currentPage === 'bookings' ? 'active' : ''}`}>Bookings</a>
          <a href="/analytics" className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}>Analytics</a>
          <a href="/equipment" className={`nav-link ${currentPage === 'equipment' ? 'active' : ''}`}>Equipment</a>
          <a href="/events" className={`nav-link ${currentPage === 'events' ? 'active' : ''}`}>Events</a>
          <a href="/support" className={`nav-link ${currentPage === 'support' ? 'active' : ''}`}>Support</a>
          <a href="/notifications" className="nav-link" style={{ position: 'relative' }}>
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
          <div className="nav-link notification-section" onClick={() => setShowNotificationCard(!showNotificationCard)}>
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
                  <button className="view-all-btn">View All</button>
                </div>
              </div>
            )}
          </div>
          <div className="nav-link nav-dropdown" onClick={() => setShowSettingsDropdown((v) => !v)} tabIndex={0} onBlur={() => setShowSettingsDropdown(false)} style={{ position: 'relative' }}>
            <span>Settings</span>
            <div className="dropdown-arrow">▼</div>
            {showSettingsDropdown && (
              <div className="dropdown-menu">
                <a href="/edit-information" className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  Edit Information
                </a>
                <a href="/privacy-policy" className="dropdown-item">
                  <span className="dropdown-icon">🔒</span>
                  Privacy Policy
                </a>
                <div className="dropdown-item" onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/login';
                }}>
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navigation {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 2rem 3.5rem 1.5rem 3.5rem;
          position: relative;
          z-index: 1001;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 0.8rem;
          }
          .nav-link {
            font-size: 0.85rem;
            padding: 0.25rem 0.4rem;
          }
        }

        @media (max-width: 640px) {
          .navigation {
            padding: 0.6rem 0.8rem;
          }
          .nav-links {
            gap: 0.6rem;
            justify-content: space-between;
          }
          .nav-link {
            font-size: 0.8rem;
            padding: 0.2rem 0.3rem;
          }
          .notification-card {
            width: 260px;
            right: -80px;
          }
        }

        @media (max-width: 480px) {
          .navigation {
            padding: 0.5rem;
          }
          .nav-links {
            gap: 0.4rem;
            flex-direction: column;
            width: 100%;
          }
          .nav-link {
            font-size: 0.75rem;
            padding: 0.3rem 0.5rem;
            text-align: center;
            width: 100%;
          }
          .notification-card {
            width: 240px;
            right: -100px;
          }
        }

        @media (max-width: 360px) {
          .nav-links {
            gap: 0.3rem;
          }
          .nav-link {
            font-size: 0.7rem;
            padding: 0.25rem 0.4rem;
          }
          .notification-card {
            width: 220px;
            right: -120px;
          }
        }
      `}</style>
    </>
  );
}