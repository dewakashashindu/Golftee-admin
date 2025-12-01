
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

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
    <>
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
        }}
      `}</style>
    </div>
    
    <Footer />
    </>
  );
}
