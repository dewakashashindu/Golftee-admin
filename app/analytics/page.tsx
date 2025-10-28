"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [chartData, setChartData] = useState({
    labels: ['Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 30, 20, 27, 35, 32],
        backgroundColor: '#16a34a',
        borderColor: '#15803d',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  });

  const [timeRange, setTimeRange] = useState('week');

  const generateRandomData = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 40) + 5);
  };

  const updateChartData = (range: string) => {
    let labels: string[] = [];
    let data: number[] = [];

    if (range === 'day') {
      labels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
      data = generateRandomData(6);
    } else if (range === 'week') {
      labels = ['Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21'];
      data = generateRandomData(6);
    } else if (range === 'month') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      data = generateRandomData(4);
    } else if (range === 'custom') {
      // For custom date, show hourly slots for the selected date
      labels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
      data = generateRandomData(6);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Bookings',
          data,
          backgroundColor: '#16a34a',
          borderColor: '#15803d',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    });
    setTimeRange(range);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#374151',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#374151',
          font: {
            size: 12,
          },
        },
      },
    },
  };
  return (
    <div className="analytics-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      {/* Top Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <a href="/home" className="nav-link">Home</a>
          <a href="/bookings" className="nav-link">Bookings</a>
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
                      <p className="notification-text">Payment received from Royal Club</p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="notification-card-footer">
                    <Link href="/notifications" passHref>
                    <button className="notification-btn view-all-btn">View All</button>
                    </Link>
                    <button
                    className="notification-btn mark-read-btn"
                    onClick={() => {
                      // Mark all notifications as read (simulate by hiding badge)
                      const badge = document.querySelector('.nav-link .notification-section ~ span');
                      setShowNotificationCard(false);
                    }}
                    >
                    Mark All Read
                    </button>
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
      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card stat-orange">
          <div className="stat-value">24</div>
          <div className="stat-label">Total Bookings<br />of Today</div>
        </div>
        <div className="stat-card stat-cyan">
          <div className="stat-value">105</div>
          <div className="stat-label">Total Bookings<br />of This Week</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-value">$450</div>
          <div className="stat-label">Total Revenue<br />of Today</div>
        </div>
        <div className="stat-card stat-pink">
          <div className="stat-value">$4500</div>
          <div className="stat-label">Total Revenue<br />of This Week</div>
        </div>
      </div>
      {/* Bookings History Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-title">Bookings History</div>
          <div className="chart-controls">
            <button 
              className={`time-btn ${timeRange === 'day' ? 'active' : ''}`}
              onClick={() => updateChartData('day')}
            >
              Today
            </button>
            <button 
              className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => updateChartData('week')}
            >
              This Week
            </button>
            <button 
              className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => updateChartData('month')}
            >
              This Month
            </button>
            <input
              type="date"
              className="time-btn"
              value={customDate}
              onChange={e => {
                setCustomDate(e.target.value);
                updateChartData('custom');
              }}
              style={{ minWidth: '140px', padding: '0.5rem 1rem', fontSize: '0.9rem', border: '2px solid #d1d5db', borderRadius: '6px', fontWeight: 500, color: '#374151', background: 'white', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="chart-area">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <style jsx>{`
        .analytics-container {
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
        .stat-cards {
          display: flex;
          gap: 2.2rem;
          margin: 0 auto 2.5rem auto;
          justify-content: center;
          position: relative;
          z-index: 10;
        }
        .stat-card {
          width: 240px;
          height: 120px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          font-size: 1.1rem;
        }
        .stat-orange {
          background: #ffa726;
          color: #111;
        }
        .stat-cyan {
          background: #2fffe6;
          color: #111;
        }
        .stat-green {
          background: #c6f56b;
          color: #111;
        }
        .stat-pink {
          background: #ff4fff;
          color: #111;
        }
        .stat-value {
          font-size: 2.7rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }
        .stat-label {
          font-size: 1.1rem;
          text-align: center;
          font-weight: 400;
        }
        .chart-container {
          background: #ededed;
          border-radius: 10px;
          margin: 0 auto;
          width: 900px;
          max-width: 98vw;
          padding: 2.2rem 2.2rem 1.5rem 2.2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          position: relative;
          z-index: 10;
        }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .chart-title {
          font-size: 1.3rem;
          font-weight: 600;
        }
        .chart-controls {
          display: flex;
          gap: 0.5rem;
        }
        .time-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #d1d5db;
          background: white;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          color: #374151;
        }
        .time-btn:hover {
          border-color: #16a34a;
          color: #16a34a;
        }
        .time-btn.active {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }
        .chart-area {
          width: 100%;
          height: 350px;
          position: relative;
        }
        @media (max-width: 1200px) {
          .stat-cards {
            flex-wrap: wrap;
            gap: 1.2rem;
          }
          .stat-card {
            width: 180px;
            height: 100px;
          }
          .chart-container {
            width: 99vw;
            padding: 1.2rem 0.2rem 1rem 0.2rem;
          }
          .chart-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
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
          .stat-cards {
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
          }
          .chart-container {
            width: 99vw;
            padding: 0.5rem 0.1rem 0.5rem 0.1rem;
          }
          .chart-controls {
            flex-wrap: wrap;
          }
          .time-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
