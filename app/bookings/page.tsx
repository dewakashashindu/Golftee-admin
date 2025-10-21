"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [customDate, setCustomDate] = useState('');

  // Sample booking data with more dates for filtering
  const allBookings = [
    {
      id: 1,
      fullName: "John Smith",
      date: "2025-10-21", // Today
      startTime: "09:00",
      endTime: "11:00",
      noPlayers: 4,
      nonPlayers: 0,
      email: "john.smith@email.com",
      phoneNo: "0771234567",
      status: "Confirmed"
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      date: "2025-10-21", // Today
      startTime: "14:00",
      endTime: "16:00",
      noPlayers: 2,
      nonPlayers: 2,
      email: "sarah.j@email.com",
      phoneNo: "0779876543",
      status: "Pending"
    },
    {
      id: 3,
      fullName: "Mike Wilson",
      date: "2025-10-22", // This week
      startTime: "08:00",
      endTime: "10:30",
      noPlayers: 3,
      nonPlayers: 1,
      email: "mike.w@email.com",
      phoneNo: "0775555555",
      status: "Confirmed"
    },
    {
      id: 4,
      fullName: "Emma Davis",
      date: "2025-10-23", // This week
      startTime: "16:30",
      endTime: "18:30",
      noPlayers: 2,
      nonPlayers: 0,
      email: "emma.davis@email.com",
      phoneNo: "0773333333",
      status: "Cancelled"
    },
    {
      id: 5,
      fullName: "Robert Brown",
      date: "2025-10-25", // This week
      startTime: "10:00",
      endTime: "12:00",
      noPlayers: 4,
      nonPlayers: 0,
      email: "robert.b@email.com",
      phoneNo: "0777777777",
      status: "Confirmed"
    },
    {
      id: 6,
      fullName: "Lisa White",
      date: "2025-10-28", // This month
      startTime: "15:00",
      endTime: "17:00",
      noPlayers: 2,
      nonPlayers: 2,
      email: "lisa.w@email.com",
      phoneNo: "0766666666",
      status: "Pending"
    },
    {
      id: 7,
      fullName: "David Green",
      date: "2025-11-05", // Next month
      startTime: "09:30",
      endTime: "11:30",
      noPlayers: 3,
      nonPlayers: 1,
      email: "david.g@email.com",
      phoneNo: "0755555555",
      status: "Confirmed"
    }
  ];

  // Filter bookings based on selected filter type
  const filteredBookings = useMemo(() => {
    const today = new Date('2025-10-21'); // Current date
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return allBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      
      switch (filterType) {
        case 'today':
          return booking.date === today.toISOString().split('T')[0];
        case 'week':
          return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
        case 'month':
          return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
        case 'custom':
          return customDate ? booking.date === customDate : true;
        default:
          return true;
      }
    });
  }, [filterType, customDate]);

  return (
    <div className="bookings-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      {/* Top Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
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
                <button className="profile-btn logout-btn" onClick={() => window.location.href = '/login'}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <div className="header-top">
            <h1 className="page-title">All Bookings</h1>
            
            {/* Filter Dropdown */}
            <div className="filter-dropdown">
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Bookings</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>
          </div>
          
          {/* Custom Date Section - appears when Custom Date is selected */}
          {filterType === 'custom' && (
            <div className="custom-date-section">
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="date-input"
                placeholder="Select date"
              />
              {customDate && (
                <button 
                  className="clear-date-btn"
                  onClick={() => setCustomDate('')}
                >
                  Clear
                </button>
              )}
            </div>
          )}
          
          {/* Results Count */}
          <div className="results-count">
            Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr className="table-header">
                <th>Full Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>No. Players</th>
                <th>Non Players</th>
                <th>email</th>
                <th>Phone No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
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
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
          bottom: -600px;
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
        @media (max-width: 1200px) {
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
          .table-container {
            overflow-x: auto;
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
          .header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .filter-select {
            width: 100%;
            min-width: auto;
          }
          .custom-date-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}