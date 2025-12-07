"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import fetchAdminBookings from "../../lib/api";
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
  const [customRevenueDate, setCustomRevenueDate] = useState('');
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

  const [revenueChartData, setRevenueChartData] = useState({
    labels: ['Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21'],
    datasets: [
      {
        label: 'Revenue',
        data: [480, 1200, 800, 1080, 1400, 1280],
        backgroundColor: '#22c55e',
        borderColor: '#16a34a',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  });

  const [timeRange, setTimeRange] = useState('week');
  const [revenueTimeRange, setRevenueTimeRange] = useState('week');
  const [totalRevenue, setTotalRevenue] = useState(6840); // Initialize with default week total
  const [adminBookings, setAdminBookings] = useState<any[]>([]);
  const [adminBookingsLoading, setAdminBookingsLoading] = useState(false);
  const [adminBookingsError, setAdminBookingsError] = useState<string | null>(null);

  const generateRandomData = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 40) + 5);
  };

  const generateRandomRevenueData = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 1000) + 200);
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

  const updateRevenueChartData = (range: string) => {
    let labels: string[] = [];
    let data: number[] = [];

    if (range === 'day') {
      labels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
      data = generateRandomRevenueData(6);
    } else if (range === 'week') {
      labels = ['Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21'];
      data = generateRandomRevenueData(6);
    } else if (range === 'month') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      data = generateRandomRevenueData(4);
    } else if (range === 'custom') {
      // For custom date, show hourly slots for the selected date
      labels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
      data = generateRandomRevenueData(6);
    }

    setRevenueChartData({
      labels,
      datasets: [
        {
          label: 'Revenue',
          data,
          backgroundColor: '#22c55e',
          borderColor: '#16a34a',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    });
    
    // Calculate total revenue for the selected period
    const total = data.reduce((sum, value) => sum + value, 0);
    setTotalRevenue(total);
    
    setRevenueTimeRange(range);
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
  // Fetch admin bookings on mount (uses optional token from localStorage)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setAdminBookingsLoading(true);
      setAdminBookingsError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
        const data = await fetchAdminBookings(token as string | undefined);
        const list = data?.bookings || data || [];
        if (mounted) setAdminBookings(Array.isArray(list) ? list : []);
      } catch (err: any) {
        if (mounted) setAdminBookingsError(err?.message || String(err));
      } finally {
        if (mounted) setAdminBookingsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
  return (
    <div className="analytics-container">
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <Navigation currentPage="analytics" />
      
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
          <div className="stat-card stat-cyan">
            <div className="stat-value">{adminBookingsLoading ? '...' : adminBookings.length}</div>
            <div className="stat-label">Admin Bookings<br />(fetched)</div>
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
              className="time-btn date-input"
              value={customDate}
              onChange={e => {
                setCustomDate(e.target.value);
                updateChartData('custom');
              }}
              title="Select a custom date for bookings"
            />
          </div>
        </div>
        <div className="chart-area">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Revenue History Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-title-section">
            <div className="chart-title">Revenue History</div>
            <div className="revenue-calculator">
              <div className="calculator-label">Total Revenue:</div>
              <div className="calculator-value">${totalRevenue.toLocaleString()}</div>
              <div className="calculator-period">
                {revenueTimeRange === 'day' && 'Today'}
                {revenueTimeRange === 'week' && 'This Week'}
                {revenueTimeRange === 'month' && 'This Month'}
                {revenueTimeRange === 'custom' && customRevenueDate && `On ${new Date(customRevenueDate).toLocaleDateString()}`}
                {revenueTimeRange === 'custom' && !customRevenueDate && 'Custom Date'}
              </div>
            </div>
          </div>
          <div className="chart-controls">
            <button 
              className={`time-btn ${revenueTimeRange === 'day' ? 'active' : ''}`}
              onClick={() => updateRevenueChartData('day')}
            >
              Today
            </button>
            <button 
              className={`time-btn ${revenueTimeRange === 'week' ? 'active' : ''}`}
              onClick={() => updateRevenueChartData('week')}
            >
              This Week
            </button>
            <button 
              className={`time-btn ${revenueTimeRange === 'month' ? 'active' : ''}`}
              onClick={() => updateRevenueChartData('month')}
            >
              This Month
            </button>
            <input
              type="date"
              className="time-btn date-input"
              value={customRevenueDate}
              onChange={e => {
                setCustomRevenueDate(e.target.value);
                updateRevenueChartData('custom');
              }}
              title="Select a custom date for revenue"
            />
          </div>
        </div>
        <div className="chart-area">
          <Bar data={revenueChartData} options={chartOptions} />
        </div>
      </div>

      {/* Review Analysis Section */}
      <div className="review-analysis-container">
        <div className="review-header">
          <h2 className="review-title">Customer Reviews Analysis</h2>
          <div className="overall-rating">
            <div className="rating-score">4.6</div>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${star <= 4.6 ? 'filled' : star - 1 < 4.6 ? 'half-filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <div className="rating-count">Based on 1,247 reviews</div>
          </div>
        </div>

        <div className="review-stats">
          <div className="rating-breakdown">
            <h3>Rating Breakdown</h3>
            <div className="rating-bars">
                  <div className="rating-bar">
                    <span className="rating-label">5 stars</span>
                    <div className="bar-container">
                      <div className="bar-fill bar-fill-5stars"></div>
                    </div>
                    <span className="rating-percentage">65%</span>
                  </div>
              <div className="rating-bar">
                <span className="rating-label">4 stars</span>
                <div className="bar-container">
                  <div className="bar-fill bar-fill-4stars"></div>
                </div>
                <span className="rating-percentage">20%</span>
              </div>
              <div className="rating-bar">
                <span className="rating-label">3 stars</span>
                <div className="bar-container">
                  <div className="bar-fill bar-fill-3stars"></div>
                </div>
                <span className="rating-percentage">10%</span>
              </div>
              <div className="rating-bar">
                <span className="rating-label">2 stars</span>
                <div className="bar-container">
                  <div className="bar-fill bar-fill-2stars"></div>
                </div>
                <span className="rating-percentage">3%</span>
              </div>
              <div className="rating-bar">
                <span className="rating-label">1 star</span>
                <div className="bar-container">
                  <div className="bar-fill bar-fill-1star"></div>
                </div>
                <span className="rating-percentage">2%</span>
              </div>
            </div>
          </div>

          <div className="review-highlights">
            <h3>Review Highlights</h3>
            <div className="highlight-tags">
              <span className="highlight-tag positive">Excellent Course Condition</span>
              <span className="highlight-tag positive">Professional Staff</span>
              <span className="highlight-tag positive">Beautiful Scenery</span>
              <span className="highlight-tag positive">Well Maintained Greens</span>
              <span className="highlight-tag neutral">Pricing</span>
              <span className="highlight-tag negative">Booking System</span>
            </div>
          </div>
        </div>

        <div className="recent-reviews">
          <h3>Recent Reviews</h3>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header-card">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">JD</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">John Davies</div>
                    <div className="review-date">2 days ago</div>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= 5 ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-content">
                "Absolutely stunning golf course! The greens are in perfect condition and the staff is incredibly professional. The booking process was smooth and the facilities are top-notch. Will definitely be coming back!"
              </div>
              <div className="review-tags">
                <span className="tag">Course Condition</span>
                <span className="tag">Staff Service</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header-card">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">SM</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">Sarah Mitchell</div>
                    <div className="review-date">5 days ago</div>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= 4 ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-content">
                "Great course with beautiful scenery. The facilities are well-maintained and the caddies are very knowledgeable. Only minor issue was the wait time at the clubhouse restaurant."
              </div>
              <div className="review-tags">
                <span className="tag">Scenery</span>
                <span className="tag">Facilities</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header-card">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">RP</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">Robert Park</div>
                    <div className="review-date">1 week ago</div>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= 5 ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-content">
                "Exceptional golf experience! The course layout is challenging yet fair, and the views are breathtaking. Staff went above and beyond to make our tournament memorable."
              </div>
              <div className="review-tags">
                <span className="tag">Course Layout</span>
                <span className="tag">Tournament</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header-card">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">AL</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">Amanda Lee</div>
                    <div className="review-date">1 week ago</div>
                  </div>
                </div>
                <div className="review-rating">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= 4 ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-content">
                "Good course overall with nice amenities. The pro shop has a great selection. Could improve the pace of play management during busy periods."
              </div>
              <div className="review-tags">
                <span className="tag">Amenities</span>
                <span className="tag">Pro Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

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
          margin: 0 auto 2.5rem auto;
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
        .chart-title-section {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .chart-title {
          font-size: 1.3rem;
          font-weight: 600;
        }
        .revenue-calculator {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          min-width: 180px;
        }
        .calculator-label {
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 0.3rem;
        }
        .calculator-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .calculator-period {
          font-size: 0.8rem;
          font-weight: 400;
          opacity: 0.8;
          text-transform: capitalize;
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
        .date-input {
          min-width: 140px;
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
        @media (max-width: 1400px) {
          .stat-cards {
            gap: 2rem;
          }
          .stat-card {
            width: 220px;
            height: 110px;
          }
          .chart-container {
            width: 95vw;
            padding: 2rem 1.8rem 1.3rem 1.8rem;
          }
        }

        @media (max-width: 1200px) {
          .stat-cards {
            flex-wrap: wrap;
            gap: 1.5rem;
            justify-content: center;
          }
          .stat-card {
            width: 200px;
            height: 105px;
          }
          .stat-value {
            font-size: 2.4rem;
          }
          .stat-label {
            font-size: 1rem;
          }
          .chart-container {
            width: 98vw;
            padding: 1.8rem 1.2rem 1.2rem 1.2rem;
          }
          .chart-header {
            flex-direction: column;
            gap: 1.2rem;
            align-items: flex-start;
          }
          .chart-title-section {
            flex-direction: column;
            gap: 1.2rem;
            align-items: flex-start;
            width: 100%;
          }
          .revenue-calculator {
            min-width: auto;
            width: 100%;
            max-width: 220px;
            text-align: center;
            align-items: center;
          }
          .chart-controls {
            flex-wrap: wrap;
            gap: 0.4rem;
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
          .stat-cards {
            gap: 1.3rem;
          }
          .stat-card {
            width: 180px;
            height: 95px;
          }
          .stat-value {
            font-size: 2.2rem;
          }
          .stat-label {
            font-size: 0.95rem;
          }
          .chart-title {
            font-size: 1.2rem;
          }
          .chart-area {
            height: 320px;
          }
          
          /* Review Analysis Responsiveness */
          .review-analysis-container {
            width: 98vw;
            padding: 1.8rem;
          }
          .review-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .reviews-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          .stat-cards {
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
          }
          .stat-card {
            width: 220px;
            height: 100px;
          }
        }
        /* Review Analysis Styles */
        .review-analysis-container {
          background: #ededed;
          border-radius: 10px;
          margin: 0 auto 2.5rem auto;
          width: 900px;
          max-width: 98vw;
          padding: 2.2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          position: relative;
          z-index: 10;
        }
        
        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #d1d5db;
        }
        
        .review-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }
        
        .overall-rating {
          text-align: center;
        }
        
        .rating-score {
          font-size: 2.5rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.25rem;
        }
        
        .rating-stars {
          display: flex;
          gap: 0.1rem;
          justify-content: center;
          margin-bottom: 0.25rem;
        }
        
        .star {
          font-size: 1.2rem;
          color: #d1d5db;
          transition: color 0.2s;
        }
        
        .star.filled {
          color: #fbbf24;
        }
        
        .star.half-filled {
          background: linear-gradient(90deg, #fbbf24 50%, #d1d5db 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .rating-count {
          font-size: 0.85rem;
          color: #6b7280;
        }
        
        .review-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .rating-breakdown h3,
        .review-highlights h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 1rem 0;
        }
        
        .rating-bars {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .rating-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        
        .rating-label {
          min-width: 50px;
          color: #374151;
          font-weight: 500;
        }
        
        .bar-container {
          flex: 1;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .rating-percentage {
          min-width: 35px;
          text-align: right;
          color: #6b7280;
          font-weight: 500;
        }
        
        .highlight-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .highlight-tag {
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .highlight-tag.positive {
          background: #dcfce7;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        
        .highlight-tag.neutral {
          background: #fef3c7;
          color: #d97706;
          border: 1px solid #fed7aa;
        }
        
        .highlight-tag.negative {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        
        .recent-reviews h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 1rem 0;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .review-card {
          background: white;
          border-radius: 10px;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .review-header-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #16a34a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .reviewer-name {
          font-weight: 600;
          color: #111;
          font-size: 0.9rem;
        }
        
        .review-date {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .review-rating .review-stars {
          display: flex;
          gap: 0.1rem;
        }
        
        .review-rating .star {
          font-size: 0.9rem;
        }
        
        .review-content {
          color: #374151;
          line-height: 1.5;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }
        
        .review-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .tag {
          padding: 0.2rem 0.6rem;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
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
            left: 0;
            transform: none;
          }
          .profile-card {
            width: 260px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
          }
          .chart-container {
            width: 99vw;
            padding: 1rem 0.5rem;
          }
          .chart-header {
            gap: 0.8rem;
          }
          .chart-title {
            font-size: 1.1rem;
          }
          .revenue-calculator {
            max-width: 200px;
            padding: 0.8rem 1.2rem;
          }
          .calculator-value {
            font-size: 1.6rem;
          }
          .chart-controls {
            flex-wrap: wrap;
            gap: 0.3rem;
          }
          .time-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          .chart-area {
            height: 280px;
          }
          
          /* Review Analysis Mobile Styles */
          .review-analysis-container {
            width: 99vw;
            padding: 1.2rem 0.8rem;
          }
          
          .review-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .review-title {
            font-size: 1.3rem;
          }
          
          .rating-score {
            font-size: 2.2rem;
          }
          
          .review-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          
          .review-card {
            padding: 1rem;
          }
          
          .highlight-tags {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .stat-card {
            width: 200px;
            height: 90px;
          }
          .stat-value {
            font-size: 2rem;
          }
          .stat-label {
            font-size: 0.9rem;
          }
          .chart-container {
            padding: 0.8rem 0.3rem;
          }
          .chart-title {
            font-size: 1rem;
          }
          .revenue-calculator {
            max-width: 180px;
            padding: 0.7rem 1rem;
          }
          .calculator-value {
            font-size: 1.4rem;
          }
          .calculator-label, .calculator-period {
            font-size: 0.8rem;
          }
          .time-btn {
            padding: 0.35rem 0.7rem;
            font-size: 0.75rem;
          }
          .chart-area {
            height: 250px;
          }
          
          .review-analysis-container {
            padding: 1rem 0.5rem;
          }
          
          .review-title {
            font-size: 1.2rem;
          }
          
          .rating-score {
            font-size: 2rem;
          }
          
          .rating-count {
            font-size: 0.8rem;
          }
          
          .rating-bars {
            gap: 0.4rem;
          }
          
          .rating-bar {
            font-size: 0.8rem;
          }
          
          .highlight-tag {
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
          }
          
          .review-card {
            padding: 0.8rem;
          }
          
          .reviewer-name {
            font-size: 0.85rem;
          }
          
          .review-content {
            font-size: 0.85rem;
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
          .stat-card {
            width: 180px;
            height: 85px;
          }
          .stat-value {
            font-size: 1.8rem;
          }
          .stat-label {
            font-size: 0.85rem;
          }
          .chart-container {
            padding: 0.6rem 0.2rem;
          }
          .chart-area {
            height: 220px;
          }
          .time-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }
          
          .review-analysis-container {
            padding: 0.8rem 0.3rem;
          }
          
          .review-title {
            font-size: 1.1rem;
          }
          
          .rating-score {
            font-size: 1.8rem;
          }
          
          .review-card {
            padding: 0.7rem;
          }
        }

        @media (max-width: 360px) {
          .stat-card {
            width: 160px;
            height: 80px;
          }
          .stat-value {
            font-size: 1.6rem;
          }
          .stat-label {
            font-size: 0.8rem;
          }
          .chart-area {
            height: 200px;
          }
          
          .review-analysis-container {
            padding: 0.6rem 0.2rem;
          }
          
          .review-title {
            font-size: 1rem;
          }
          
          .rating-score {
            font-size: 1.6rem;
          }
        }
      `}</style>
        </div>
  );
}
