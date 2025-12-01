"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'tournament' | 'member' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'John Doe has requested a booking for Saturday 2:00 PM at Course #1',
      time: '2 minutes ago',
      isRead: false,
      priority: 'high',
      actionUrl: '/bookings'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $150 received from Royal Club membership fees',
      time: '15 minutes ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'tournament',
      title: 'Tournament Schedule Updated',
      message: 'Spring Championship tournament has been rescheduled to next weekend',
      time: '1 hour ago',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'member',
      title: 'New Member Registration',
      message: 'Sarah Johnson has completed her membership registration',
      time: '2 hours ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled system maintenance will occur tonight from 2:00 AM - 4:00 AM',
      time: '3 hours ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '6',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Mike Wilson\'s booking for Sunday 10:00 AM has been confirmed',
      time: '4 hours ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '7',
      type: 'payment',
      title: 'Payment Overdue',
      message: 'Premium membership payment is 5 days overdue for Alex Thompson',
      time: '1 day ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '8',
      type: 'tournament',
      title: 'Tournament Registration Open',
      message: 'Registration is now open for the Annual Golf Championship',
      time: '2 days ago',
      isRead: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'payment' | 'tournament' | 'member' | 'system'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return (
          <svg className="notification-type-icon booking" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        );
      case 'payment':
        return (
          <svg className="notification-type-icon payment" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'tournament':
        return (
          <svg className="notification-type-icon tournament" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228V2.721m-2.48 5.228a6.726 6.726 0 01-2.748 1.35m0 0V11.25a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75v-1.5m-4.5 0H9.497" />
          </svg>
        );
      case 'member':
        return (
          <svg className="notification-type-icon member" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="notification-type-icon system" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="notification-type-icon default" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="notifications-container">
      <title>Notifications - GolfTee Admin</title>
      
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <Navigation currentPage="notifications" />

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Notifications</h1>
            <div className="notification-badge">
              {unreadCount > 0 && (
                <span className="unread-count">{unreadCount} unread</span>
              )}
            </div>
          </div>
          
          <div className="page-actions">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-buttons">
            <button 
              onClick={() => setFilter('all')} 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All ({notifications.length})
            </button>
            <button 
              onClick={() => setFilter('unread')} 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            >
              Unread ({unreadCount})
            </button>
            <button 
              onClick={() => setFilter('booking')} 
              className={`filter-btn ${filter === 'booking' ? 'active' : ''}`}
            >
              Bookings
            </button>
            <button 
              onClick={() => setFilter('payment')} 
              className={`filter-btn ${filter === 'payment' ? 'active' : ''}`}
            >
              Payments
            </button>
            <button 
              onClick={() => setFilter('tournament')} 
              className={`filter-btn ${filter === 'tournament' ? 'active' : ''}`}
            >
              Tournaments
            </button>
            <button 
              onClick={() => setFilter('member')} 
              className={`filter-btn ${filter === 'member' ? 'active' : ''}`}
            >
              Members
            </button>
            <button 
              onClick={() => setFilter('system')} 
              className={`filter-btn ${filter === 'system' ? 'active' : ''}`}
            >
              System
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M9 11a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
                </svg>
              </div>
              <h3>No notifications found</h3>
              <p>You're all caught up! No notifications match your current filter.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.isRead ? 'unread' : ''} ${getPriorityColor(notification.priority)}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="notification-content">
                  <div className="notification-header">
                    <h3 className="notification-title">{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  {notification.actionUrl && (
                    <Link href={notification.actionUrl} className="notification-action">
                      View Details
                    </Link>
                  )}
                </div>

                <div className="notification-actions">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="action-btn mark-read-btn"
                      title="Mark as read"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="action-btn delete-btn"
                    title="Delete notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

                {!notification.isRead && <div className="unread-indicator"></div>}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .notifications-container {
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

        .nav-link:hover, .nav-link.active {
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
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }

        .notification-badge {
          display: flex;
          align-items: center;
        }

        .unread-count {
          background: #dc2626;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .page-actions {
          display: flex;
          gap: 1rem;
        }

        .mark-all-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #16a34a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mark-all-btn:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .filters-section {
          margin-bottom: 2rem;
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          background: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #16a34a;
          color: #16a34a;
        }

        .filter-btn.active {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .notification-item {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          border-left: 4px solid transparent;
          position: relative;
          transition: all 0.2s;
        }

        .notification-item:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .notification-item.unread {
          border-left-color: #16a34a;
          background: #fafffe;
        }

        .notification-item.priority-high {
          border-left-color: #dc2626;
        }

        .notification-item.priority-medium {
          border-left-color: #f59e0b;
        }

        .notification-item.priority-low {
          border-left-color: #6b7280;
        }

        .notification-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
        }

        .notification-type-icon {
          width: 24px;
          height: 24px;
        }

        .notification-type-icon.booking {
          color: #3b82f6;
        }

        .notification-type-icon.payment {
          color: #10b981;
        }

        .notification-type-icon.tournament {
          color: #f59e0b;
        }

        .notification-type-icon.member {
          color: #8b5cf6;
        }

        .notification-type-icon.system {
          color: #6b7280;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
          gap: 1rem;
        }

        .notification-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0;
          line-height: 1.3;
        }

        .notification-time {
          font-size: 0.85rem;
          color: #6b7280;
          flex-shrink: 0;
        }

        .notification-message {
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        .notification-action {
          font-size: 0.9rem;
          color: #16a34a;
          text-decoration: none;
          font-weight: 500;
        }

        .notification-action:hover {
          text-decoration: underline;
        }

        .notification-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #f3f4f6;
          color: #6b7280;
        }

        .action-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .action-btn svg {
          width: 16px;
          height: 16px;
        }

        .mark-read-btn:hover {
          background: #dcfce7;
          color: #16a34a;
        }

        .delete-btn:hover {
          background: #fecaca;
          color: #dc2626;
        }

        .unread-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6b7280;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: #d1d5db;
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
          .notification-item {
            padding: 1.4rem;
          }
          .notification-title {
            font-size: 1.05rem;
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
          .notification-item {
            padding: 1.3rem;
          }
          .filter-buttons {
            padding: 0.9rem;
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
          .notification-icon {
            width: 44px;
            height: 44px;
          }
          .notification-type-icon {
            width: 22px;
            height: 22px;
          }
          .filter-btn {
            padding: 0.45rem 0.9rem;
            font-size: 0.85rem;
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
          .page-header {
            gap: 1.5rem;
          }
          .notification-item {
            padding: 1.2rem;
          }
          .notification-title {
            font-size: 1rem;
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
          .main-content {
            padding: 1rem 0.8rem 2rem 0.8rem;
          }
          .page-title {
            font-size: 1.9rem;
          }
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.2rem;
          }
          .page-title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .filter-buttons {
            padding: 0.8rem;
            gap: 0.4rem;
          }
          .filter-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          .notification-item {
            padding: 1rem;
            gap: 0.8rem;
          }
          .notification-icon {
            width: 40px;
            height: 40px;
          }
          .notification-type-icon {
            width: 20px;
            height: 20px;
          }
          .notification-header {
            gap: 0.8rem;
          }
          .notification-title {
            font-size: 0.95rem;
          }
          .notification-message {
            font-size: 0.9rem;
          }
          .notification-actions {
            position: absolute;
            top: 1rem;
            right: 1rem;
            flex-direction: row;
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
          }
          .filter-buttons {
            padding: 0.7rem;
            justify-content: center;
          }
          .notification-item {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.9rem;
          }
          .notification-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
            width: 100%;
          }
          .notification-actions {
            top: 0.8rem;
            right: 0.8rem;
          }
          .profile-card {
            width: 260px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
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
          .mark-all-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
          .filter-buttons {
            padding: 0.6rem;
            gap: 0.3rem;
          }
          .filter-btn {
            padding: 0.35rem 0.7rem;
            font-size: 0.75rem;
          }
          .notification-item {
            padding: 0.8rem;
            margin-bottom: 0.8rem;
          }
          .notification-icon {
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }
          .notification-type-icon {
            width: 18px;
            height: 18px;
          }
          .notification-title {
            font-size: 0.9rem;
          }
          .notification-message {
            font-size: 0.85rem;
            line-height: 1.4;
          }
          .notification-time {
            font-size: 0.8rem;
          }
          .action-btn {
            width: 28px;
            height: 28px;
          }
          .action-btn svg {
            width: 14px;
            height: 14px;
          }
          .notification-actions {
            top: 0.7rem;
            right: 0.7rem;
            gap: 0.4rem;
          }
          .unread-indicator {
            top: 0.7rem;
            right: 0.7rem;
            width: 6px;
            height: 6px;
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
          .page-title-section {
            text-align: center;
            width: 100%;
          }
          .unread-count {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
          }
          .mark-all-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            width: 100%;
            justify-content: center;
          }
          .filter-buttons {
            padding: 0.5rem;
            gap: 0.2rem;
          }
          .filter-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }
          .notification-item {
            padding: 0.7rem;
          }
          .notification-icon {
            width: 32px;
            height: 32px;
          }
          .notification-type-icon {
            width: 16px;
            height: 16px;
          }
          .notification-title {
            font-size: 0.85rem;
            line-height: 1.3;
          }
          .notification-message {
            font-size: 0.8rem;
          }
          .notification-time {
            font-size: 0.75rem;
          }
          .notification-action {
            font-size: 0.8rem;
          }
          .action-btn {
            width: 26px;
            height: 26px;
          }
          .action-btn svg {
            width: 12px;
            height: 12px;
          }
        }

        @media (max-width: 360px) {
          .page-title {
            font-size: 1.3rem;
          }
          .notification-item {
            padding: 0.6rem;
          }
          .notification-icon {
            width: 30px;
            height: 30px;
          }
          .notification-title {
            font-size: 0.8rem;
          }
          .notification-message {
            font-size: 0.75rem;
          }
          .filter-btn {
            padding: 0.25rem 0.5rem;
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}