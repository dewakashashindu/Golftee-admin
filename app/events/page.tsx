
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";

interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  format: string;
  description: string;
  location: string;
  maxParticipants: number;
  entryFee: string;
  prizePool: string;
  poster: string;
  participants: string[];
}

const initialTournaments: Tournament[] = [
  {
    id: "1",
    name: "Spring Open",
    date: "2025-04-15",
    time: "09:00",
    format: "Stroke Play",
    description: "Annual spring tournament for all members.",
    location: "Main Golf Course",
    maxParticipants: 50,
    entryFee: "$25",
    prizePool: "$500",
    poster: "",
    participants: [],
  },
];

export default function EventsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    format: "",
    description: "",
    location: "",
    maxParticipants: "",
    entryFee: "",
    prizePool: "",
    poster: "",
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setForm({ ...form, poster: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCreateTournament(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      // Update existing tournament
      const updatedTournaments = tournaments.map(t => 
        t.id === editingId 
          ? { ...t, name: form.name, date: form.date, format: form.format, description: form.description, poster: form.poster }
          : t
      );
      setTournaments(updatedTournaments);
      setEditingId(null);
    } else {
      // Create new tournament
      const newTournament: Tournament = {
        id: (tournaments.length + 1).toString(),
        name: form.name,
        date: form.date,
        time: form.time,
        format: form.format,
        description: form.description,
        location: form.location,
        maxParticipants: parseInt(form.maxParticipants) || 0,
        entryFee: form.entryFee,
        prizePool: form.prizePool,
        poster: form.poster,
        participants: [],
      };
      setTournaments([...tournaments, newTournament]);
    }
    setForm({ name: "", date: "", time: "", format: "", description: "", location: "", maxParticipants: "", entryFee: "", prizePool: "", poster: "" });
    setShowForm(false);
  }

  function handleEditTournament(tournament: Tournament) {
    setForm({
      name: tournament.name,
      date: tournament.date,
      time: tournament.time,
      format: tournament.format,
      description: tournament.description,
      location: tournament.location,
      maxParticipants: tournament.maxParticipants.toString(),
      entryFee: tournament.entryFee,
      prizePool: tournament.prizePool,
      poster: tournament.poster,
    });
    setEditingId(tournament.id);
    setShowForm(true);
  }

  function handleDeleteTournament(id: string) {
    if (confirm("Are you sure you want to delete this tournament?")) {
      setTournaments(tournaments.filter(t => t.id !== id));
    }
  }

  function handleCancelEdit() {
    setForm({ name: "", date: "", time: "", format: "", description: "", location: "", maxParticipants: "", entryFee: "", prizePool: "", poster: "" });
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Circles */}
      <div style={{
        position: 'fixed',
        left: '-300px',
        top: '-250px',
        width: '800px',
        height: '800px',
        background: '#b8e6c1',
        borderRadius: '50%',
        opacity: 1,
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        right: '-200px',
        bottom: '-300px',
        width: '800px',
        height: '800px',
        background: '#b8e6c1',
        borderRadius: '50%',
        opacity: 1,
        zIndex: 0
      }} />
      
      <Navigation currentPage="events" />


          <a href="/notifications" style={{ 
            fontSize: '1.35rem',
            fontWeight: '500',
            color: '#111',
            cursor: 'pointer',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.2s',
            position: 'relative'
          }}>
            Notifications
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
          <div style={{
            fontSize: '1.35rem',
            fontWeight: '500',
            color: '#111',
            cursor: 'pointer',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.2s',
            position: 'relative'
          }} onClick={() => setShowNotificationCard(!showNotificationCard)}>
            <span>Quick View</span>
            {showNotificationCard && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                zIndex: 1002,
                border: '1px solid #e5e7eb',
                marginTop: '0.5rem'
              }}>
                <div style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#111',
                    margin: 0
                  }}>Notifications</h3>
                </div>
                <div style={{
                  padding: 0,
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.875rem 1.5rem',
                    borderBottom: '1px solid #f9fafb',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#16a34a',
                      borderRadius: '50%',
                      marginTop: '0.25rem',
                      flexShrink: 0
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.4'
                      }}>New event registration</p>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>2 minutes ago</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.875rem 1.5rem',
                    borderBottom: '1px solid #f9fafb',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#16a34a',
                      borderRadius: '50%',
                      marginTop: '0.25rem',
                      flexShrink: 0
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.4'
                      }}>Tournament schedule updated</p>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>1 hour ago</span>
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid #f3f4f6',
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'center'
                }}>
                  <Link href="/notifications">
                    <button style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: 'none',
                      outline: 'none',
                      background: '#16a34a',
                      color: 'white'
                    }}>View All</button>
                  </Link>
                  <button 
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: 'none',
                      outline: 'none',
                      background: '#f3f4f6',
                      color: '#666'
                    }}
                    onClick={() => setShowNotificationCard(false)}
                  >
                    Mark All Read
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: '500',
            color: '#111',
            cursor: 'pointer',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.2s',
            position: 'relative',
            display: 'inline-block'
          }}>
            <span>Settings <span style={{
              fontSize: '0.7em',
              marginLeft: '0.4em',
              verticalAlign: 'middle',
              transition: 'transform 0.2s'
            }}>▼</span></span>
            <div style={{
              display: 'none',
              position: 'absolute',
              left: 0,
              top: '100%',
              minWidth: '180px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              borderRadius: '12px',
              zIndex: 1000,
              padding: '0.5em 0',
              marginTop: '8px'
            }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onClick={() => window.location.href = '/reset-password'}
              >
                <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Reset Password
              </div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onClick={() => window.location.href = '/edit-information'}
              >
                <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Edit Information
              </div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '8px',
          transition: 'all 0.2s',
          position: 'relative'
        }} onClick={() => setShowProfileCard(!showProfileCard)}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#16a34a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          </div>
          <span style={{ fontWeight: '500' }}>Royal Colombo</span>
          
          {showProfileCard && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '280px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
              zIndex: 1002,
              border: '1px solid #e5e7eb',
              marginTop: '8px'
            }}>
              <div style={{
                padding: '1.5rem 1.5rem 1rem',
                textAlign: 'center',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: '#111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width="32" height="32">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                </div>
              </div>
              <div style={{
                padding: '1rem 1.5rem 1.5rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#111',
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.3'
                }}>Royal Colombo Golf Course</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  margin: '0.3rem 0'
                }}>royalgolf@gmail.com</p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  margin: '0.3rem 0 0 0'
                }}>0775698201</p>
              </div>
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #f3f4f6',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <button 
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 'none',
                    outline: 'none',
                    background: '#f3f4f6',
                    color: '#666'
                  }}
                  onClick={() => setShowProfileCard(false)}
                >
                  Cancel
                </button>
                <button 
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 'none',
                    outline: 'none',
                    background: '#ef4444',
                    color: 'white'
                  }}
                  onClick={() => window.location.href = '/login'}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <div style={{
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '3rem',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
        borderRadius: '24px',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800',
          textAlign: 'center',
          position: 'relative',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>Tournaments & Events</h1>
        <button 
          style={{
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '20px',
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '3rem',
            boxShadow: '0 8px 25px rgba(22, 163, 74, 0.4)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={() => setShowForm(true)}
        >
          {editingId ? "Edit Tournament" : "Create Tournament"}
        </button>
        {showForm && (
          <form 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem',
              background: 'rgba(240, 253, 244, 0.8)',
              padding: '1.5rem',
              borderRadius: '15px',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(22, 163, 74, 0.1)'
            }}
            onSubmit={handleCreateTournament}
          >
            <input
              name="name"
              placeholder="Tournament Name"
              value={form.name}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="location"
              placeholder="Location (e.g. Main Golf Course)"
              value={form.location}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="format"
              placeholder="Format (e.g. Stroke Play)"
              value={form.format}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="maxParticipants"
              type="number"
              placeholder="Maximum Participants"
              value={form.maxParticipants}
              onChange={handleInput}
              required
              min="1"
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="entryFee"
              placeholder="Entry Fee (e.g. $25)"
              value={form.entryFee}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              name="prizePool"
              placeholder="Prize Pool (e.g. $500)"
              value={form.prizePool}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInput}
              required
              style={{
                padding: '0.8rem',
                borderRadius: '10px',
                border: '2px solid rgba(22, 163, 74, 0.2)',
                background: 'rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label htmlFor="poster" style={{
                fontWeight: '500',
                color: '#374151'
              }}>Event Poster:</label>
              <input
                id="poster"
                name="poster"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  background: 'white'
                }}
              />
              {form.poster && (
                <div style={{ marginTop: '0.5rem' }}>
                  <img 
                    src={form.poster} 
                    alt="Poster preview" 
                    style={{
                      maxWidth: '200px',
                      height: 'auto',
                      borderRadius: '6px',
                      border: '2px solid #e5e7eb'
                    }}
                  />
                </div>
              )}
            </div>
            <button 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {editingId ? "Update Tournament" : "Add Tournament"}
            </button>
            <button 
              type="button" 
              onClick={handleCancelEdit}
              style={{
                background: '#f3f4f6',
                color: '#666',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </button>
          </form>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {tournaments.map((t) => (
            <div key={t.id} style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              padding: '2rem',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #059669, #16a34a, #22c55e)'
              }} />
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#059669',
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>{t.name}</h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    margin: '1.5rem 0',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.8), rgba(236, 253, 245, 0.6))',
                    borderRadius: '16px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)'
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>📅 Date:</strong> {t.date}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>🕐 Time:</strong> {t.time}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>📍 Location:</strong> {t.location}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>🏌️ Format:</strong> {t.format}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>👥 Max Participants:</strong> {t.maxParticipants}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>💰 Entry Fee:</strong> {t.entryFee}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}><strong>🏆 Prize Pool:</strong> {t.prizePool}</p>
                  </div>
                  <p style={{
                    fontStyle: 'italic',
                    color: '#4b5563',
                    margin: '1.5rem 0',
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(243, 244, 246, 0.7))',
                    borderRadius: '12px',
                    borderLeft: '4px solid #10b981',
                    fontSize: '1.05rem',
                    lineHeight: '1.6'
                  }}>{t.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                    <button 
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
                      }}
                      onClick={() => handleEditTournament(t)}
                    >
                      Edit
                    </button>
                    <button 
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #dc2626 100%)',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                      }}
                      onClick={() => handleDeleteTournament(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {t.poster && (
                  <div style={{ flexShrink: 0, width: '150px' }}>
                    <img 
                      src={t.poster} 
                      alt={`${t.name} poster`} 
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{
        background: 'linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%)',
        position: 'relative',
        zIndex: 10,
        marginTop: '9rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 20px rgba(19, 169, 5, 0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
          gap: '3rem',
          padding: '3rem 4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '350px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '0.75rem',
              marginBottom: '1rem',
              display: 'inline-block',
              width: 'fit-content'
            }}>
              <img 
                src="/icon.png" 
                alt="GolfTee logo featuring a stylized golf ball and tee, set against a green background representing a golf course. The logo conveys a professional and welcoming atmosphere. If text is present, it reads GolfTee." 
                style={{
                  width: '80px',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              margin: '0.5rem 0 0 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>GolfTee</h2>
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0.25rem 0 1.5rem 0'
            }}>Golf Club Management System</p>
            
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#b8e6c1',
              margin: '0 0 1rem 0',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>About Us</h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.5',
              margin: '0 0 1.5rem 0',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}>
              Complete golf management solution for clubs, tournaments, and player analytics. Streamline your operations with our comprehensive admin portal.
            </p>
            
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#b8e6c1',
                margin: '0 0 1rem 0',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>Support</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1rem' }}>📞</span>
                <span style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>+94 77 569 8201</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1rem' }}>✉️</span>
                <span style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>support@golftee.com</span>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#b8e6c1',
                margin: '0 0 1rem 0',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>Follow Us</h3>
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/94775698201" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.372-.26.297-.99.967-.99 2.357 0 1.388 1.014 2.732 1.155 2.927.141.196 1.989 3.038 4.823 4.26.675.292 1.203.466 1.613.596.677.215 1.293.184 1.78.112.544-.081 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
                <a href="mailto:support@golftee.com" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#b8e6c1',
              margin: '0 0 1rem 0',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>Management</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/home" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Dashboard</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/bookings" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Bookings</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/analytics" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Analytics</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/events" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Tournaments</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Member Management</a>
              </li>
            </ul>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#b8e6c1',
              margin: '0 0 1rem 0',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>Support & Legal</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/support" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Help Center</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Documentation</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Contact Support</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Terms of Service</a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}>Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#b8e6c1',
              margin: '0 0 1rem 0',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>Send Review & Rating</h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.4',
              margin: '0 0 1rem 0'
            }}>
              Share your experience with GolfTee Admin Portal and help us improve our services.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.85rem',
                  color: '#b8e6c1',
                  fontWeight: '500'
                }}>Your Rating:</label>
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  alignItems: 'center'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: '#fbbf24',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <textarea 
                placeholder="Write your review here..." 
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '0.85rem',
                  resize: 'vertical',
                  minHeight: '60px',
                  backdropFilter: 'blur(10px)'
                }}
                rows={3}
              />
              <button 
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.2rem'
            }}>🏌️‍♂️</span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>golftee-admin.com</span>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.85rem',
            margin: 0
          }}>
            2025 © GolfTee Admin Portal. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) {
          .events-container {
            max-width: 90% !important;
            padding: 2rem !important;
            margin: 1rem auto !important;
          }
          
          .tournament-details {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          
          .tournament-content {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .tournament-poster {
            width: 100% !important;
            max-width: 200px !important;
            margin: 0 auto !important;
          }
          
          .navigation {
            padding: 1.5rem 2rem !important;
          }
          
          .nav-links {
            gap: 2rem !important;
          }
          
          .footer-content {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
            padding: 2rem !important;
          }
          
          .footer-about {
            grid-column: span 2 !important;
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 768px) {
          .navigation {
            padding: 1rem !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .nav-links {
            flex-wrap: wrap !important;
            gap: 1rem !important;
            justify-content: center !important;
          }
          
          .nav-link {
            font-size: 1rem !important;
            padding: 0.25rem 0.5rem !important;
          }
          
          .profile-section {
            margin-top: 1rem !important;
          }
          
          .events-container {
            margin: 1rem !important;
            padding: 1.5rem !important;
            border-radius: 16px !important;
          }
          
          .page-title {
            font-size: 2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .create-btn {
            padding: 0.75rem 2rem !important;
            font-size: 1rem !important;
            margin-bottom: 2rem !important;
          }
          
          .tournament-form {
            padding: 1rem !important;
            gap: 0.75rem !important;
          }
          
          .tournament-form input,
          .tournament-form textarea {
            padding: 0.6rem !important;
            font-size: 0.9rem !important;
          }
          
          .tournament-card {
            padding: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .tournament-name {
            font-size: 1.5rem !important;
          }
          
          .tournament-details {
            padding: 1rem !important;
            gap: 0.5rem !important;
          }
          
          .tournament-details p {
            font-size: 0.85rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .tournament-actions {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          
          .action-btn {
            padding: 0.6rem 1rem !important;
            font-size: 0.9rem !important;
            width: 100% !important;
          }
          
          .notification-card {
            width: 90vw !important;
            left: 5vw !important;
            transform: none !important;
          }
          
          .profile-card {
            width: 90vw !important;
            right: 5vw !important;
          }
          
          .footer-content {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            padding: 1.5rem !important;
            gap: 2rem !important;
          }
          
          .footer-about {
            grid-column: span 1 !important;
          }
          
          .footer-brand {
            font-size: 1.3rem !important;
          }
          
          .social-icons {
            justify-content: center !important;
            gap: 1rem !important;
          }
          
          .footer-bottom {
            flex-direction: column !important;
            gap: 1rem !important;
            text-align: center !important;
            padding: 1.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .bg-circle-left,
          .bg-circle-right {
            display: none !important;
          }
          
          .navigation {
            padding: 0.75rem !important;
          }
          
          .nav-links {
            font-size: 0.85rem !important;
          }
          
          .events-container {
            margin: 0.5rem !important;
            padding: 1rem !important;
          }
          
          .page-title {
            font-size: 1.75rem !important;
          }
          
          .tournament-card {
            padding: 1rem !important;
          }
          
          .tournament-details {
            padding: 0.75rem !important;
          }
          
          .footer-content {
            padding: 1rem !important;
          }
          
          .social-icons {
            gap: 0.75rem !important;
          }
          
          .social-icon {
            width: 35px !important;
            height: 35px !important;
          }
        }
      `}</style>
    </div>
  );
}
