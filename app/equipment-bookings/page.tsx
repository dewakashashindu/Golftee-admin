"use client";
import { useEffect, useState, useMemo } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";
import { bookingEquipment as mockBookingEquipment, removeBookingEquipment } from "@/lib/mockStore";

interface Equipment {
  id: string;
  name: string;
  type: string;
  condition: string;
  rentalPrice: string;
  rental_price?: string;
  quantity: number;
  description: string;
}

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
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

interface BookingEquipment {
  id: string;
  bookingId: string;
  booking_id?: string;
  equipmentId: string;
  equipment_id?: string;
  quantity: number;
  rentalPrice?: string;
  rental_price?: string;
  createdAt: string;
  created_at?: string;
  booking: Booking;
  equipment: Equipment;
}

export default function EquipmentBookingsPage() {
  const [bookingEquipment, setBookingEquipment] = useState<BookingEquipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingEquipment | null>(null);

  useEffect(() => {
    setBookingEquipment(mockBookingEquipment as BookingEquipment[]);
    setLoading(false);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this equipment from the booking?")) return;

    setLoading(true);
    try {
      removeBookingEquipment(id);
      setBookingEquipment(mockBookingEquipment as BookingEquipment[]);
      alert("Equipment removed from booking");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to remove equipment");
    } finally {
      setLoading(false);
    }
  };

  const normalizeStatus = (status?: string) => {
    const v = (status || "").toLowerCase();
    if (v === "canceled") return "cancelled";
    return v;
  };

  const normalizeConditionClass = (condition?: string) => {
    return (condition || "").toLowerCase().replace(/\s+/g, "_");
  };

  const filteredBookings = useMemo(() => {
    return bookingEquipment.filter((item) => {
      const matchesSearch =
        item.booking?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.booking?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.booking?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || normalizeStatus(item.booking?.status) === filterStatus.toLowerCase();

      const matchesType =
        filterType === "all" || item.equipment?.type?.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [bookingEquipment, searchTerm, filterStatus, filterType]);

  const calculateTotalPrice = (item: BookingEquipment) => {
    const price = parseFloat(
      (item.rentalPrice || item.equipment?.rentalPrice || "0").replace(/[^0-9.]/g, "")
    );
    return (price * item.quantity).toFixed(2);
  };

  // Get unique equipment types for filter
  const equipmentTypes = Array.from(
    new Set(bookingEquipment.map(item => item.equipment?.type).filter(Boolean))
  );

  return (
    <div className="equipment-bookings-container">

      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />

      <Navigation currentPage="equipment-bookings" />

      {/* Main Content */}
      <PageTransition>
      <div className="main-content">
        <div className="page-header">
          <div className="header-top">
            <h1 className="page-title">Equipment Bookings</h1>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="search-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="search-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by customer name, email, or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Equipment Type:</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} title="Filter by equipment type">
                <option value="all">All Types</option>
                {equipmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="results-count">
            Showing {filteredBookings.length} equipment booking{filteredBookings.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="table-container">
          {/* Loading/Error States */}
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading equipment bookings...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {/* Table View */}
          {!loading && !error && (
            <>
              <table className="bookings-table">
                <thead>
                  <tr className="table-header">
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Equipment</th>
                    <th>Type</th>
                    <th>Condition</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="empty-row">
                        No equipment bookings found
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((item) => (
                      <tr key={item.id} className="table-row">
                        <td>{item.booking?.id || "N/A"}</td>
                        <td>{item.booking?.fullName || item.booking?.name || "N/A"}</td>
                        <td>{item.booking?.phoneNo || "N/A"}</td>
                        <td>{item.booking?.email || "N/A"}</td>
                        <td>{item.booking?.date || "N/A"}</td>
                        <td>
                          {item.booking?.startTime || "N/A"}
                          {item.booking?.endTime && ` - ${item.booking.endTime}`}
                        </td>
                        <td>{item.equipment?.name || "N/A"}</td>
                        <td>{item.equipment?.type || "N/A"}</td>
                        <td>
                          <span className={`condition-badge ${(item.equipment?.condition || "").toLowerCase().replace(/\s+/g, "_")}`}>
                            {item.equipment?.condition || "N/A"}
                          </span>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.rentalPrice || item.equipment?.rentalPrice || "0"}</td>
                        <td className="price-cell">${calculateTotalPrice(item)}</td>
                        <td>
                          <span className={`status-badge ${(() => { const v = (item.booking?.status || '').toLowerCase(); return v === 'canceled' ? 'cancelled' : v; })()}`}>
                            {item.booking?.status || "N/A"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="delete-btn-table"
                            title="Remove"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="mobile-booking-cards">
                {filteredBookings.length === 0 ? (
                  <div className="empty-state">
                    <h3>No Equipment Bookings Found</h3>
                    <p>No equipment has been booked yet or no results match your filters.</p>
                  </div>
                ) : (
                  filteredBookings.map((item) => (
                    <div key={item.id} className="booking-card">
                      <div className="booking-card-header">
                        <div className="booking-card-name">
                          {item.booking?.fullName || item.booking?.name || "N/A"}
                        </div>
                        <span className={`status-badge ${(() => { const v = (item.booking?.status || '').toLowerCase(); return v === 'canceled' ? 'cancelled' : v; })()}`}>
                          {item.booking?.status || "N/A"}
                        </span>
                      </div>
                      <div className="booking-card-details">
                        <div className="booking-detail">
                          <span className="booking-detail-label">Booking ID</span>
                          <span className="booking-detail-value">{item.booking?.id || "N/A"}</span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Equipment</span>
                          <span className="booking-detail-value">{item.equipment?.name || "N/A"}</span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Type</span>
                          <span className="booking-detail-value">{item.equipment?.type || "N/A"}</span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Condition</span>
                          <span className={`condition-badge ${(item.equipment?.condition || "").toLowerCase().replace(/\s+/g, "_")}`}>
                            {item.equipment?.condition || "N/A"}
                          </span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Date</span>
                          <span className="booking-detail-value">{item.booking?.date || "N/A"}</span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Time</span>
                          <span className="booking-detail-value">
                            {item.booking?.startTime || "N/A"}
                            {item.booking?.endTime && ` - ${item.booking.endTime}`}
                          </span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Quantity</span>
                          <span className="booking-detail-value">{item.quantity}</span>
                        </div>
                        <div className="booking-detail">
                          <span className="booking-detail-label">Total Price</span>
                          <span className="booking-detail-value price">${calculateTotalPrice(item)}</span>
                        </div>
                        <div className="booking-card-actions">
                          <button onClick={() => handleDelete(item.id)} className="delete-btn-card">
                            Remove Equipment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
      </PageTransition>

      <Footer />

      <style jsx>{`
        .equipment-bookings-container {
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
          padding: 1rem 3.5rem 2rem 3.5rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 1.5rem;
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

        .filters-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #9ca3af;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
          box-sizing: border-box;
        }

        .search-box input:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }

        .filter-group select {
          padding: 0.75rem 1rem;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .results-count {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .loading-state {
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

        .error-state {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .table-header {
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }

        .table-header th {
          padding: 1rem 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          white-space: nowrap;
          font-size: 0.85rem;
        }

        .table-row {
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.15s;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .table-row td {
          padding: 1rem 0.75rem;
          color: #111827;
        }

        .price-cell {
          font-weight: 600;
          color: #16a34a;
        }

        .empty-row {
          text-align: center;
          padding: 3rem;
          color: #9ca3af;
          font-style: italic;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.confirmed {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge.cancelled {
          background: #fecaca;
          color: #991b1b;
        }

        .status-badge.completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .condition-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .condition-badge.excellent {
          background: #d1fae5;
          color: #065f46;
        }

        .condition-badge.good {
          background: #dbeafe;
          color: #1e40af;
        }

        .condition-badge.fair {
          background: #fef3c7;
          color: #92400e;
        }

        .condition-badge.needs_repair {
          background: #fecaca;
          color: #991b1b;
        }

        .delete-btn-table {
          padding: 0.4rem 0.8rem;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn-table:hover {
          background: #fecaca;
          border-color: #fca5a5;
        }

        /* Mobile Cards */
        .mobile-booking-cards {
          display: none;
        }

        .booking-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .booking-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .booking-card-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
        }

        .booking-card-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .booking-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .booking-detail-label {
          color: #6b7280;
          font-weight: 500;
        }

        .booking-detail-value {
          color: #111;
          font-weight: 500;
          text-align: right;
        }

        .booking-detail-value.price {
          color: #16a34a;
          font-weight: 600;
        }

        .booking-card-actions {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .delete-btn-card {
          width: 100%;
          padding: 0.75rem;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn-card:hover {
          background: #fecaca;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
        }

        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          font-size: 1rem;
          margin: 0;
          color: #9ca3af;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
        }

        @media (max-width: 800px) {
          .main-content {
            padding: 1rem 1rem 2rem 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .filters-section {
            flex-direction: column;
          }

          .search-box {
            min-width: 100%;
          }

          .table-container {
            border-radius: 8px;
          }

          .bookings-table {
            display: none;
          }

          .mobile-booking-cards {
            display: block;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }

          .booking-card {
            padding: 0.75rem;
          }

          .mobile-booking-cards {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
