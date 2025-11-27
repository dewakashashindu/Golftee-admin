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
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
}

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    format: '',
    maxParticipants: '',
    description: ''
  });

  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'Monthly Championship',
      date: '2025-12-15',
      time: '08:00',
      format: 'Stroke Play',
      participants: 24,
      maxParticipants: 32,
      status: 'upcoming',
      description: 'Monthly championship tournament for all members'
    },
    {
      id: '2',
      name: 'Weekend Classic',
      date: '2025-12-08',
      time: '09:30',
      format: 'Match Play',
      participants: 16,
      maxParticipants: 16,
      status: 'completed',
      description: 'Weekend classic tournament'
    },
    {
      id: '3',
      name: 'New Year Tournament',
      date: '2026-01-01',
      time: '10:00',
      format: 'Best Ball',
      participants: 8,
      maxParticipants: 20,
      status: 'upcoming',
      description: 'Special New Year celebration tournament'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTournaments(prev => prev.map(t => 
        t.id === editingId 
          ? { ...t, ...formData, participants: t.participants, maxParticipants: parseInt(formData.maxParticipants) }
          : t
      ));
      setEditingId(null);
    } else {
      const newTournament: Tournament = {
        id: Date.now().toString(),
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
        participants: 0,
        status: 'upcoming'
      };
      setTournaments(prev => [...prev, newTournament]);
    }
    setFormData({ name: '', date: '', time: '', format: '', maxParticipants: '', description: '' });
    setShowForm(false);
  };

  const handleEdit = (tournament: Tournament) => {
    setFormData({
      name: tournament.name,
      date: tournament.date,
      time: tournament.time,
      format: tournament.format,
      maxParticipants: tournament.maxParticipants.toString(),
      description: tournament.description
    });
    setEditingId(tournament.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', date: '', time: '', format: '', maxParticipants: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
        borderRadius: '50%',
        opacity: 0.1,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '200px',
        right: '-150px',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
        borderRadius: '50%',
        opacity: 0.08,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
        borderRadius: '50%',
        opacity: 0.05,
        zIndex: 0
      }} />
      
      <Navigation currentPage="events" />
      
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
        }}>
          Tournament Events
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: 0
          }}>
            Manage golf tournaments and events
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
            }}
          >
            + Add Tournament
          </button>
        </div>

        {/* Tournament Form */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>
                {editingId ? 'Edit Tournament' : 'Add New Tournament'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                    Tournament Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                      Format
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    >
                      <option value="">Select Format</option>
                      <option value="Stroke Play">Stroke Play</option>
                      <option value="Match Play">Match Play</option>
                      <option value="Best Ball">Best Ball</option>
                      <option value="Scramble">Scramble</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      minHeight: '80px',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #22c55e 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {editingId ? 'Update' : 'Create'} Tournament
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tournaments Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {tournaments.map(tournament => (
            <div key={tournament.id} style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#111',
                  margin: 0
                }}>
                  {tournament.name}
                </h3>
                <span style={{
                  background: tournament.status === 'upcoming' ? '#22c55e' : 
                            tournament.status === 'completed' ? '#6b7280' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {tournament.status}
                </span>
              </div>
              <div style={{ marginBottom: '1rem', color: '#666', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500' }}>Date:</span>
                  <span>{tournament.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500' }}>Time:</span>
                  <span>{tournament.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500' }}>Format:</span>
                  <span>{tournament.format}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500' }}>Participants:</span>
                  <span>{tournament.participants}/{tournament.maxParticipants}</span>
                </div>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: 1.5
              }}>
                {tournament.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(tournament)}
                  style={{
                    flex: 1,
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tournament.id)}
                  style={{
                    flex: 1,
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%)',
        position: 'relative',
        zIndex: 10,
        marginTop: '9rem',
        padding: '4rem 0 2rem',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'white'
            }}>
              GolfTee Admin
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Professional golf course management system for clubs and organizations.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                transition: 'background 0.3s'
              }}>📧</a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                transition: 'background 0.3s'
              }}>📱</a>
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/home" style={{
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>
                Home
              </Link>
              <Link href="/bookings" style={{
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>
                Bookings
              </Link>
              <Link href="/analytics" style={{
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>
                Analytics
              </Link>
              <Link href="/support" style={{
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>
                Support & Help Center
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Contact Info
            </h4>
            <div style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              <p style={{ margin: '0.5rem 0' }}>📍 Royal Colombo Golf Course</p>
              <p style={{ margin: '0.5rem 0' }}>📧 royalgolf@gmail.com</p>
              <p style={{ margin: '0.5rem 0' }}>📞 0775698201</p>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          marginTop: '3rem',
          paddingTop: '2rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <p>&copy; 2025 GolfTee Admin Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}