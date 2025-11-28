"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";

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
      message: 'Sarah Wilson has completed membership registration and is awaiting approval',
      time: '2 hours ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur on Sunday 2:00 AM - 4:00 AM',
      time: '1 day ago',
      isRead: true,
      priority: 'medium'
    }
  ]);

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'payment':
        return '💰';
      case 'tournament':
        return '🏆';
      case 'member':
        return '👤';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <title>Notifications - GolfTee Admin</title>
      
      {/* Background Circles */}
      <div style={{
        position: 'absolute',
        left: '-300px',
        top: '-250px',
        width: '800px',
        height: '800px',
        background: '#b8e6c1',
        borderRadius: '50%',
        opacity: 1,
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        right: '-200px',
        bottom: '-600px',
        width: '800px',
        height: '800px',
        background: '#b8e6c1',
        borderRadius: '50%',
        opacity: 1,
        zIndex: 1
      }} />
      
      <Navigation currentPage="notifications" />

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          background: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111',
              margin: 0
            }}>Notifications</h1>
            {unreadCount > 0 && (
              <span style={{
                background: '#dc2626',
                color: 'white',
                borderRadius: '20px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#15803d'}
                onMouseOut={(e) => e.currentTarget.style.background = '#16a34a'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          background: 'white',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            All ({notifications.length})
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            background: '#f3f4f6',
            color: '#6b7280',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Unread ({unreadCount})
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            background: '#f3f4f6',
            color: '#6b7280',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Booking ({notifications.filter(n => n.type === 'booking').length})
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            background: '#f3f4f6',
            color: '#6b7280',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Payment ({notifications.filter(n => n.type === 'payment').length})
          </button>
        </div>

        {/* Notifications List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                background: notification.isRead ? 'white' : '#f0f9ff',
                borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
                padding: '1.5rem',
                borderRadius: '0 10px 10px 0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem'
                  }}>{getNotificationIcon(notification.type)}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#111',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {notification.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#6b7280'
                      }}>
                        {notification.time}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: getPriorityColor(notification.priority),
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      style={{
                        background: '#16a34a',
                        color: 'white',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <p style={{
                color: '#374151',
                lineHeight: '1.5',
                margin: '0 0 1rem 0'
              }}>
                {notification.message}
              </p>
              
              {notification.actionUrl && (
                <Link href={notification.actionUrl}>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}>
                    View Details →
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>📬</div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#6b7280',
              margin: '0 0 0.5rem 0'
            }}>
              No notifications
            </h3>
            <p style={{
              color: '#9ca3af',
              margin: 0
            }}>
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}