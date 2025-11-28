"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 0 4rem 0'
    }}>
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
      
      <Navigation currentPage="analytics" />
      
      {/* Stat Cards */}
      <div style={{
        display: 'flex',
        gap: '2.2rem',
        margin: '0 auto 2.5rem auto',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          width: '240px',
          height: '120px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          fontSize: '1.1rem',
          background: '#ffa726',
          color: '#111'
        }}>
          <div style={{
            fontSize: '2.7rem',
            fontWeight: '700',
            marginBottom: '0.2rem'
          }}>24</div>
          <div style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            fontWeight: '400'
          }}>Total Bookings<br />of Today</div>
        </div>
        <div style={{
          width: '240px',
          height: '120px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          fontSize: '1.1rem',
          background: '#2fffe6',
          color: '#111'
        }}>
          <div style={{
            fontSize: '2.7rem',
            fontWeight: '700',
            marginBottom: '0.2rem'
          }}>105</div>
          <div style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            fontWeight: '400'
          }}>Total Bookings<br />of This Week</div>
        </div>
        <div style={{
          width: '240px',
          height: '120px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          fontSize: '1.1rem',
          background: '#c6f56b',
          color: '#111'
        }}>
          <div style={{
            fontSize: '2.7rem',
            fontWeight: '700',
            marginBottom: '0.2rem'
          }}>$450</div>
          <div style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            fontWeight: '400'
          }}>Total Revenue<br />of Today</div>
        </div>
        <div style={{
          width: '240px',
          height: '120px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          fontSize: '1.1rem',
          background: '#ff4fff',
          color: '#111'
        }}>
          <div style={{
            fontSize: '2.7rem',
            fontWeight: '700',
            marginBottom: '0.2rem'
          }}>$4500</div>
          <div style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            fontWeight: '400'
          }}>Total Revenue<br />of This Week</div>
        </div>
      </div>

      {/* Bookings History Chart */}
      <div style={{
        background: '#ededed',
        borderRadius: '10px',
        margin: '0 auto 2.5rem auto',
        width: '900px',
        maxWidth: '98vw',
        padding: '2.2rem 2.2rem 1.5rem 2.2rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '600'
          }}>Bookings History</div>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: timeRange === 'day' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: timeRange === 'day' ? '#16a34a' : 'white',
                color: timeRange === 'day' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateChartData('day')}
            >
              Today
            </button>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: timeRange === 'week' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: timeRange === 'week' ? '#16a34a' : 'white',
                color: timeRange === 'week' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateChartData('week')}
            >
              This Week
            </button>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: timeRange === 'month' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: timeRange === 'month' ? '#16a34a' : 'white',
                color: timeRange === 'month' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateChartData('month')}
            >
              This Month
            </button>
            <input
              type="date"
              value={customDate}
              onChange={e => {
                setCustomDate(e.target.value);
                updateChartData('custom');
              }}
              style={{
                minWidth: '140px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                border: '2px solid #d1d5db',
                borderRadius: '6px',
                fontWeight: 500,
                color: '#374151',
                background: 'white',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '350px',
          position: 'relative'
        }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Revenue History Chart */}
      <div style={{
        background: '#ededed',
        borderRadius: '10px',
        margin: '0 auto 2.5rem auto',
        width: '900px',
        maxWidth: '98vw',
        padding: '2.2rem 2.2rem 1.5rem 2.2rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>Revenue History</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              minWidth: '180px'
            }}>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '500',
                opacity: 0.9,
                marginBottom: '0.3rem'
              }}>Total Revenue:</div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '0.2rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>${totalRevenue.toLocaleString()}</div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: '400',
                opacity: 0.8,
                textTransform: 'capitalize'
              }}>
                {revenueTimeRange === 'day' && 'Today'}
                {revenueTimeRange === 'week' && 'This Week'}
                {revenueTimeRange === 'month' && 'This Month'}
                {revenueTimeRange === 'custom' && customRevenueDate && `On ${new Date(customRevenueDate).toLocaleDateString()}`}
                {revenueTimeRange === 'custom' && !customRevenueDate && 'Custom Date'}
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: revenueTimeRange === 'day' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: revenueTimeRange === 'day' ? '#16a34a' : 'white',
                color: revenueTimeRange === 'day' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateRevenueChartData('day')}
            >
              Today
            </button>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: revenueTimeRange === 'week' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: revenueTimeRange === 'week' ? '#16a34a' : 'white',
                color: revenueTimeRange === 'week' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateRevenueChartData('week')}
            >
              This Week
            </button>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: revenueTimeRange === 'month' ? '2px solid #16a34a' : '2px solid #d1d5db',
                background: revenueTimeRange === 'month' ? '#16a34a' : 'white',
                color: revenueTimeRange === 'month' ? 'white' : '#374151',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => updateRevenueChartData('month')}
            >
              This Month
            </button>
            <input
              type="date"
              value={customRevenueDate}
              onChange={e => {
                setCustomRevenueDate(e.target.value);
                updateRevenueChartData('custom');
              }}
              style={{
                minWidth: '140px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                border: '2px solid #d1d5db',
                borderRadius: '6px',
                fontWeight: 500,
                color: '#374151',
                background: 'white',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '350px',
          position: 'relative'
        }}>
          <Bar data={revenueChartData} options={chartOptions} />
        </div>
      </div>

      {/* Review Analysis Section */}
      <div style={{
        background: '#ededed',
        borderRadius: '10px',
        margin: '0 auto 2.5rem auto',
        width: '900px',
        maxWidth: '98vw',
        padding: '2.2rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #d1d5db'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111',
            margin: 0
          }}>Customer Reviews Analysis</h2>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#16a34a',
              marginBottom: '0.25rem'
            }}>4.6</div>
            <div style={{
              display: 'flex',
              gap: '0.1rem',
              justifyContent: 'center',
              marginBottom: '0.25rem'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{
                  fontSize: '1.2rem',
                  color: star <= 4.6 ? '#fbbf24' : '#d1d5db',
                  transition: 'color 0.2s'
                }}>★</span>
              ))}
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#6b7280'
            }}>Based on 1,247 reviews</div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#111',
              margin: '0 0 1rem 0'
            }}>Rating Breakdown</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {[
                { label: '5 stars', percentage: 65, color: '#22c55e' },
                { label: '4 stars', percentage: 20, color: '#84cc16' },
                { label: '3 stars', percentage: 10, color: '#eab308' },
                { label: '2 stars', percentage: 3, color: '#f97316' },
                { label: '1 star', percentage: 2, color: '#ef4444' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    minWidth: '50px',
                    color: '#374151',
                    fontWeight: '500'
                  }}>{item.label}</span>
                  <div style={{
                    flex: 1,
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{
                    minWidth: '35px',
                    textAlign: 'right',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#111',
              margin: '0 0 1rem 0'
            }}>Review Highlights</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {[
                { text: 'Excellent Course Condition', type: 'positive' },
                { text: 'Professional Staff', type: 'positive' },
                { text: 'Beautiful Scenery', type: 'positive' },
                { text: 'Well Maintained Greens', type: 'positive' },
                { text: 'Pricing', type: 'neutral' },
                { text: 'Booking System', type: 'negative' }
              ].map((tag, index) => (
                <span key={index} style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  background: tag.type === 'positive' ? '#dcfce7' : 
                           tag.type === 'neutral' ? '#fef3c7' : '#fee2e2',
                  color: tag.type === 'positive' ? '#16a34a' :
                        tag.type === 'neutral' ? '#d97706' : '#dc2626',
                  border: tag.type === 'positive' ? '1px solid #bbf7d0' :
                         tag.type === 'neutral' ? '1px solid #fed7aa' : '1px solid #fecaca'
                }}>
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#111',
            margin: '0 0 1rem 0'
          }}>Recent Reviews</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {[
              {
                name: 'John Davies',
                avatar: 'JD',
                date: '2 days ago',
                rating: 5,
                content: 'Absolutely stunning golf course! The greens are in perfect condition and the staff is incredibly professional. The booking process was smooth and the facilities are top-notch. Will definitely be coming back!',
                tags: ['Course Condition', 'Staff Service']
              },
              {
                name: 'Sarah Mitchell',
                avatar: 'SM',
                date: '5 days ago',
                rating: 4,
                content: 'Great course with beautiful scenery. The facilities are well-maintained and the caddies are very knowledgeable. Only minor issue was the wait time at the clubhouse restaurant.',
                tags: ['Scenery', 'Facilities']
              },
              {
                name: 'Robert Park',
                avatar: 'RP',
                date: '1 week ago',
                rating: 5,
                content: 'Exceptional golf experience! The course layout is challenging yet fair, and the views are breathtaking. Staff went above and beyond to make our tournament memorable.',
                tags: ['Course Layout', 'Tournament']
              },
              {
                name: 'Amanda Lee',
                avatar: 'AL',
                date: '1 week ago',
                rating: 4,
                content: 'Good course overall with nice amenities. The pro shop has a great selection. Could improve the pace of play management during busy periods.',
                tags: ['Amenities', 'Pro Shop']
              }
            ].map((review, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '10px',
                padding: '1.25rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#16a34a',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      {review.avatar}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: '600',
                        color: '#111',
                        fontSize: '0.9rem'
                      }}>{review.name}</div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>{review.date}</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.1rem'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{
                        fontSize: '0.9rem',
                        color: star <= review.rating ? '#fbbf24' : '#d1d5db'
                      }}>★</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  color: '#374151',
                  lineHeight: 1.5,
                  marginBottom: '0.75rem',
                  fontSize: '0.9rem'
                }}>
                  "{review.content}"
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {review.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} style={{
                      padding: '0.2rem 0.6rem',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}