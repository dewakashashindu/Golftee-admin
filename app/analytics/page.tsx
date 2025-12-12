"use client";
import { useEffect, useState, useMemo } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Booking {
  id: string;
  name: string;
  fullName?: string;
  date: string;
  startTime?: string;
  start_time?: string;
  endTime?: string;
  end_time?: string;
  email?: string;
  phoneNo?: string;
  phone?: string;
  status: string;
  members: number;
  createdAt?: string;
  created_at?: string;
}

interface BookingEquipment {
  id: string;
  bookingId: string;
  equipmentId: string;
  quantity: number;
  rentalPrice: string;
  booking: Booking;
  equipment: {
    id: string;
    name: string;
    type: string;
    rentalPrice: string;
  };
}

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingEquipment, setBookingEquipment] = useState<BookingEquipment[]>([]);
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("month");
  // Fetch bookings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [bookingsRes, equipmentRes] = await Promise.all([
          fetch(`${BACKEND}/api/bookings`),
          fetch(`${BACKEND}/booking-equipment`),
        ]);

        if (!bookingsRes.ok || !equipmentRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const bookingsData = await bookingsRes.json();
        const equipmentData = await equipmentRes.json();

        setBookings(bookingsData.success ? bookingsData.data : []);
        setBookingEquipment(equipmentData.success ? equipmentData.data : []);
      } catch (err: any) {
        console.error("Error fetching analytics data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==================== ANALYTICS CALCULATIONS ====================

  // 1. KPI METRICS
  const kpiMetrics = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todaysBookings = bookings.filter((b) => {
      const bookingDate = b.date;
      return bookingDate === today;
    });

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status.toLowerCase() === "confirmed").length;
    const cancelledBookings = bookings.filter((b) => b.status.toLowerCase() === "cancelled").length;
    const totalRevenue = bookingEquipment.reduce((sum, item) => {
      const price = parseFloat((item.rentalPrice || "0").replace(/[^0-9.]/g, ""));
      return sum + price * item.quantity;
    }, 0);

    const activePlayers = new Set(bookings.filter((b) => b.status.toLowerCase() === "confirmed").map((b) => b.email)).size;

    return {
      totalBookings,
      todaysBookings: todaysBookings.length,
      activePlayers,
      cancelledToday: todaysBookings.filter((b) => b.status.toLowerCase() === "cancelled").length,
      cancellationRate: totalBookings > 0 ? ((cancelledBookings / totalBookings) * 100).toFixed(1) : "0",
      totalRevenue: totalRevenue.toFixed(2),
    };
  }, [bookings, bookingEquipment]);

  // 2. BOOKING TRENDS
  const bookingTrend = useMemo(() => {
    const now = new Date();
    let groupedData: { [key: string]: number } = {};
    let labels: string[] = [];

    if (timeRange === "day") {
      for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`);
        groupedData[`${i}:00`] = 0;
      }
    } else if (timeRange === "week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        labels.push(days[date.getDay()]);
        groupedData[dateStr] = 0;
      }
    } else if (timeRange === "month") {
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${month + 1}/${i}`);
        groupedData[`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`] = 0;
      }
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const year = now.getFullYear();

      for (let i = 0; i < 12; i++) {
        labels.push(months[i]);
        groupedData[`${year}-${String(i + 1).padStart(2, "0")}`] = 0;
      }
    }

    bookings.forEach((b) => {
      if (timeRange === "day") {
        const hour = parseInt(b.startTime?.split(":")[0] || "0");
        groupedData[`${hour}:00`]++;
      } else if (timeRange === "week") {
        groupedData[b.date]++;
      } else if (timeRange === "month") {
        groupedData[b.date]++;
      } else {
        const monthKey = b.date.substring(0, 7);
        groupedData[monthKey]++;
      }
    });

    const data = Object.values(groupedData);

    return {
      labels,
      data,
    };
  }, [bookings, timeRange]);

  // 3. REVENUE TRENDS
  const revenueTrend = useMemo(() => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = now.getFullYear();
    let revenueByMonth: { [key: string]: number } = {};
    const labels: string[] = [];

    for (let i = 0; i < 12; i++) {
      const monthKey = `${year}-${String(i + 1).padStart(2, "0")}`;
      revenueByMonth[monthKey] = 0;
      labels.push(months[i]);
    }

    bookingEquipment.forEach((item) => {
      const monthKey = (item.booking?.date || "").substring(0, 7);
      if (monthKey) {
        const price = parseFloat((item.rentalPrice || "0").replace(/[^0-9.]/g, ""));
        revenueByMonth[monthKey] += price * item.quantity;
      }
    });

    return {
      labels,
      data: Object.values(revenueByMonth),
    };
  }, [bookingEquipment]);

  // 4. CUSTOMER INSIGHTS
  const customerInsights = useMemo(() => {
    const allEmails = bookings.map((b) => b.email).filter(Boolean);
    const emailFrequency = allEmails.reduce(
      (acc, email) => {
        acc[email as string] = (acc[email as string] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

    const topCustomers = Object.entries(emailFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([email, count]) => ({
        email,
        bookings: count,
      }));

    const returningCount = Object.values(emailFrequency).filter((count) => count > 1).length;
    const newCount = Object.values(emailFrequency).filter((count) => count === 1).length;

    return {
      topCustomers,
      newVsReturning: {
        labels: ["New Customers", "Returning Customers"],
        data: [newCount, returningCount],
      },
    };
  }, [bookings]);

  // 5. EQUIPMENT ANALYTICS
  const equipmentAnalytics = useMemo(() => {
    const equipmentFrequency: { [key: string]: { count: number; revenue: number; name: string } } = {};

    bookingEquipment.forEach((item) => {
      const equipId = item.equipment.id;
      const price = parseFloat((item.equipment.rentalPrice || "0").replace(/[^0-9.]/g, ""));

      if (!equipmentFrequency[equipId]) {
        equipmentFrequency[equipId] = {
          count: 0,
          revenue: 0,
          name: item.equipment.name,
        };
      }

      equipmentFrequency[equipId].count += item.quantity;
      equipmentFrequency[equipId].revenue += price * item.quantity;
    });

    const topEquipment = Object.entries(equipmentFrequency)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([id, data]) => ({
        id,
        name: data.name,
        rentals: data.count,
        revenue: data.revenue.toFixed(2),
      }));

    return { topEquipment };
  }, [bookingEquipment]);

  // 6. COURSE UTILIZATION (if course data available)
  const courseUtilization = useMemo(() => {
    const courseBookings: { [key: string]: number } = {};

    bookings.forEach((b) => {
      const courseName = b.name || "Unknown Course";
      courseBookings[courseName] = (courseBookings[courseName] || 0) + 1;
    });

    const courses = Object.entries(courseBookings)
      .sort((a, b) => b[1] - a[1])
      .map(([course, count]) => ({
        course,
        bookings: count,
        occupancyRate: ((count / bookings.length) * 100).toFixed(1),
      }));

    return {
      labels: courses.map((c) => c.course),
      data: courses.map((c) => c.bookings),
      courses,
    };
  }, [bookings]);

  // Helper to map percentage to a CSS width class (avoids inline styles)
  const getProgressClass = (pct: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    const bucket = Math.round(clamped / 10) * 10; // 0,10,20,...100
    return `w-${bucket}`;
  };

  // 7. CANCELLATION ANALYSIS
  const cancellationAnalysis = useMemo(() => {
    const cancelledBookings = bookings.filter((b) => b.status.toLowerCase() === "cancelled");
    const totalBookings = bookings.length;

    const statusBreakdown = {
      confirmed: bookings.filter((b) => b.status.toLowerCase() === "confirmed").length,
      pending: bookings.filter((b) => b.status.toLowerCase() === "pending").length,
      completed: bookings.filter((b) => b.status.toLowerCase() === "completed").length,
      cancelled: cancelledBookings.length,
    };

    return {
      cancelledBookings: cancelledBookings.length,
      cancellationRate: totalBookings > 0 ? ((cancelledBookings.length / totalBookings) * 100).toFixed(1) : "0",
      statusLabels: Object.keys(statusBreakdown),
      statusData: Object.values(statusBreakdown),
    };
  }, [bookings]);
  if (loading) {
    return (
      <div className="analytics-container">
        <Navigation currentPage="analytics" />
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation currentPage="analytics" />
      <PageTransition>
        <div className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-top">
              <h1 className="page-title">Analytics Dashboard</h1>
              <div className="time-range-selector">
                <label htmlFor="timeRangeSelect" className="sr-only">Select time range</label>
                <select 
                  id="timeRangeSelect"
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value as any)} 
                  className="time-select"
                  title="Select the time range for analytics"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {error && <div className="error-banner">{error}</div>}
          </div>

          {/* ==================== KPI CARDS ====================*/}
          <section className="kpi-section">
            <h2 className="section-title">Key Performance Indicators</h2>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">📊</div>
                <div className="kpi-content">
                  <p className="kpi-label">Total Bookings</p>
                  <p className="kpi-value">{kpiMetrics.totalBookings}</p>
                  <p className="kpi-sublabel">{kpiMetrics.todaysBookings} today</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">💰</div>
                <div className="kpi-content">
                  <p className="kpi-label">Total Revenue</p>
                  <p className="kpi-value">${kpiMetrics.totalRevenue}</p>
                  <p className="kpi-sublabel">From equipment rentals</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">👥</div>
                <div className="kpi-content">
                  <p className="kpi-label">Active Customers</p>
                  <p className="kpi-value">{kpiMetrics.activePlayers}</p>
                  <p className="kpi-sublabel">Confirmed bookings</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">❌</div>
                <div className="kpi-content">
                  <p className="kpi-label">Cancellation Rate</p>
                  <p className="kpi-value">{kpiMetrics.cancellationRate}%</p>
                  <p className="kpi-sublabel">{kpiMetrics.cancelledToday} today</p>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== CHARTS SECTION ====================*/}
          <section className="charts-section">
            {/* Booking Trends */}
            <div className="chart-card">
              <h3 className="chart-title">Booking Trends</h3>
              <Line
                data={{
                  labels: bookingTrend.labels,
                  datasets: [
                    {
                      label: "Bookings",
                      data: bookingTrend.data,
                      borderColor: "#16a34a",
                      backgroundColor: "rgba(22, 163, 74, 0.1)",
                      borderWidth: 2,
                      fill: true,
                      tension: 0.4,
                      pointBackgroundColor: "#16a34a",
                      pointBorderColor: "#fff",
                      pointBorderWidth: 2,
                      pointRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "top" as const },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            </div>

            {/* Revenue Trends */}
            <div className="chart-card">
              <h3 className="chart-title">Monthly Revenue</h3>
              <Bar
                data={{
                  labels: revenueTrend.labels,
                  datasets: [
                    {
                      label: "Revenue ($)",
                      data: revenueTrend.data,
                      backgroundColor: "#22c55e",
                      borderColor: "#16a34a",
                      borderWidth: 1,
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "top" as const },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </section>

          {/* ==================== COURSE UTILIZATION ====================*/}
          <section className="utilization-section">
            <h2 className="section-title">Course Utilization</h2>
            <div className="utilization-chart">
              <Bar
                data={{
                  labels: courseUtilization.labels,
                  datasets: [
                    {
                      label: "Bookings",
                      data: courseUtilization.data,
                      backgroundColor: "#3b82f6",
                      borderColor: "#1e40af",
                      borderWidth: 1,
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  indexAxis: "y" as const,
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "top" as const },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <div className="utilization-table">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Bookings</th>
                    <th>Occupancy Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {courseUtilization.courses.map((course, idx) => (
                    <tr key={idx}>
                      <td>{course.course}</td>
                      <td>{course.bookings}</td>
                      <td>
                        <div className="progress-bar">
                          <div className={`progress-fill ${getProgressClass(parseFloat(course.occupancyRate))}`} />
                        </div>
                        {course.occupancyRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ==================== CUSTOMER INSIGHTS ====================*/}
          <section className="customer-section">
            <h2 className="section-title">Customer Insights</h2>
            <div className="customer-grid">
              {/* New vs Returning */}
              <div className="chart-card">
                <h3 className="chart-title">New vs Returning Customers</h3>
                <Pie
                  data={{
                    labels: customerInsights.newVsReturning.labels,
                    datasets: [
                      {
                        data: customerInsights.newVsReturning.data,
                        backgroundColor: ["#fbbf24", "#10b981"],
                        borderColor: ["#f59e0b", "#059669"],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { position: "bottom" as const },
                    },
                  }}
                />
              </div>

              {/* Top Customers */}
              <div className="top-customers-card">
                <h3 className="chart-title">Top Customers</h3>
                <div className="customer-list">
                  {customerInsights.topCustomers.length > 0 ? (
                    customerInsights.topCustomers.map((customer, idx) => (
                      <div key={idx} className="customer-item">
                        <div className="customer-rank">#{idx + 1}</div>
                        <div className="customer-info">
                          <p className="customer-email">{customer.email || "Unknown"}</p>
                          <p className="customer-bookings">{customer.bookings} bookings</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="empty-message">No customer data available</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ==================== EQUIPMENT ANALYTICS ====================*/}
          <section className="equipment-section">
            <h2 className="section-title">Equipment Analytics</h2>
            <div className="equipment-table">
              <table>
                <thead>
                  <tr>
                    <th>Equipment</th>
                    <th>Total Rentals</th>
                    <th>Revenue Generated</th>
                    <th>Avg. Revenue/Rental</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentAnalytics.topEquipment.length > 0 ? (
                    equipmentAnalytics.topEquipment.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.rentals}</td>
                        <td className="revenue-cell">${item.revenue}</td>
                        <td>${(parseFloat(item.revenue) / item.rentals).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="empty-row">
                        No equipment data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ==================== CANCELLATION ANALYSIS ====================*/}
          <section className="cancellation-section">
            <h2 className="section-title">Booking Status Distribution</h2>
            <div className="cancellation-grid">
              <div className="chart-card">
                <h3 className="chart-title">Status Breakdown</h3>
                <Pie
                  data={{
                    labels: cancellationAnalysis.statusLabels.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
                    datasets: [
                      {
                        data: cancellationAnalysis.statusData,
                        backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"],
                        borderColor: ["#059669", "#d97706", "#1e40af", "#dc2626"],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { position: "bottom" as const },
                    },
                  }}
                />
              </div>

              <div className="cancellation-summary">
                <h3 className="chart-title">Cancellation Summary</h3>
                <div className="summary-content">
                  <div className="summary-item">
                    <span className="summary-label">Total Cancelled:</span>
                    <span className="summary-value">{cancellationAnalysis.cancelledBookings}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Cancellation Rate:</span>
                    <span className="summary-value">{cancellationAnalysis.cancellationRate}%</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Confirmed Bookings:</span>
                    <span className="summary-value">{cancellationAnalysis.statusData[0]}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Pending Bookings:</span>
                    <span className="summary-value">{cancellationAnalysis.statusData[1]}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Completed Bookings:</span>
                    <span className="summary-value">{cancellationAnalysis.statusData[2]}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>


      <Footer />

      <style jsx>{`
        .analytics-container {
          min-height: 100vh;
          background: #f0f0f0;
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

        .main-content {
          position: relative;
          z-index: 10;
          padding: 2rem 3.5rem;
          max-width: 1600px;
          margin: 0 auto;
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

        .time-range-selector {
          display: flex;
          gap: 0.5rem;
        }

        .time-select {
          padding: 0.75rem 1rem;
          border: 2px solid #16a34a;
          border-radius: 8px;
          background: white;
          color: #111;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-select:hover {
          background: #f0fdf4;
        }

        .time-select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .error-banner {
          background: #fef2f2;
          border: 2px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .loading-state {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 4rem 2rem;
          color: #6b7280;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 1rem;
          border: 3px solid #e5e7eb;
          border-top-color: #16a34a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ==================== KPI SECTION ====================*/
        .kpi-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin: 0 0 1.5rem 0;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .kpi-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .kpi-icon {
          font-size: 2.5rem;
          min-width: 60px;
          text-align: center;
        }

        .kpi-content {
          flex: 1;
        }

        .kpi-label {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
          margin: 0;
        }

        .kpi-value {
          font-size: 2rem;
          font-weight: 700;
          color: #16a34a;
          margin: 0.25rem 0;
        }

        .kpi-sublabel {
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 0;
        }

        /* ==================== CHARTS SECTION ====================*/
        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .chart-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 1rem 0;
        }

        /* ==================== UTILIZATION SECTION ====================*/
        .utilization-section {
          margin-bottom: 3rem;
        }

        .utilization-chart {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          height: 400px;
        }

        .utilization-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .utilization-table table,
        .equipment-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .utilization-table table thead,
        .equipment-table table thead {
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }

        .utilization-table table th,
        .equipment-table table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .utilization-table table td,
        .equipment-table table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #111;
        }

        .utilization-table table tbody tr:hover,
        .equipment-table table tbody tr:hover {
          background: #f9fafb;
        }

        .progress-bar {
          display: inline-block;
          width: 150px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: #16a34a;
          transition: width 0.3s;
        }

        /* Width utility classes to avoid inline styles */
        .w-0 { width: 0% }
        .w-10 { width: 10% }
        .w-20 { width: 20% }
        .w-30 { width: 30% }
        .w-40 { width: 40% }
        .w-50 { width: 50% }
        .w-60 { width: 60% }
        .w-70 { width: 70% }
        .w-80 { width: 80% }
        .w-90 { width: 90% }
        .w-100 { width: 100% }

        /* ==================== CUSTOMER SECTION ====================*/
        .customer-section {
          margin-bottom: 3rem;
        }

        .customer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .top-customers-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .customer-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .customer-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
          border-left: 4px solid #16a34a;
        }

        .customer-rank {
          font-size: 1.25rem;
          font-weight: 700;
          color: #16a34a;
          min-width: 40px;
          text-align: center;
        }

        .customer-info {
          flex: 1;
        }

        .customer-email {
          font-weight: 600;
          color: #111;
          margin: 0;
          font-size: 0.9rem;
          word-break: break-all;
        }

        .customer-bookings {
          color: #6b7280;
          margin: 0.25rem 0 0 0;
          font-size: 0.85rem;
        }

        .empty-message {
          text-align: center;
          color: #9ca3af;
          padding: 2rem;
          margin: 0;
        }

        /* ==================== EQUIPMENT SECTION ====================*/
        .equipment-section {
          margin-bottom: 3rem;
        }

        .equipment-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .revenue-cell {
          font-weight: 600;
          color: #16a34a;
        }

        .empty-row {
          text-align: center;
          color: #9ca3af;
          padding: 2rem;
        }

        /* ==================== CANCELLATION SECTION ====================*/
        .cancellation-section {
          margin-bottom: 3rem;
        }

        .cancellation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .cancellation-summary {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .summary-label {
          color: #6b7280;
          font-weight: 500;
        }

        .summary-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #16a34a;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ==================== RESPONSIVE DESIGN ====================*/
        @media (max-width: 1200px) {
          .main-content {
            padding: 1.5rem 2rem;
          }

          .charts-section {
            grid-template-columns: 1fr;
          }

          .customer-grid,
          .cancellation-grid {
            grid-template-columns: 1fr;
          }

          .utilization-chart {
            height: 350px;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.75rem;
          }

          .header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .time-range-selector {
            width: 100%;
          }

          .time-select {
            width: 100%;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }

          .kpi-card {
            flex-direction: column;
            text-align: center;
          }

          .utilization-table table th,
          .equipment-table table th {
            padding: 0.75rem;
            font-size: 0.8rem;
          }

          .utilization-table table td,
          .equipment-table table td {
            padding: 0.75rem;
          }

          .progress-bar {
            display: block;
            margin: 0.5rem 0;
            width: 100%;
          }

          .utilization-chart {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .chart-card {
            padding: 1rem;
          }

          .customer-item {
            padding: 0.75rem;
          }

          .utilization-table table th,
          .equipment-table table th,
          .utilization-table table td,
          .equipment-table table td {
            padding: 0.5rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
