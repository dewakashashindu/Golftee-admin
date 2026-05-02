
"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { EventItem } from "@/lib/types/event";
import { events as mockEvents, addEvent, updateEvent } from "@/lib/mockStore";

// Backend compatibility interface
interface Event {
  id: string;
  name: string;
  type: "tournament" | "event";
  date: string;
  time: string;
  location: string;
  format?: string;
  description?: string;
  registrationDeadline?: string;
  maxParticipants: number;
  entryFee: string;
  prizePool?: string;
  poster?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  participants?: string[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [form, setForm] = useState<EventItem>({
    type: "TOURNAMENT",
    title: "",
    description: "",
    start_date: "",
    start_time: "09:00",
    location: "",
    registration_deadline: "",
    max_participants: 50,
    entry_fee: 0,
    prize_pool: 0,
    format: "",
    status: "upcoming",
    poster_url: ""
  });

  useEffect(() => {
    setEvents([...mockEvents]);
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, poster_url: previewUrl });
    }
  }

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Validation: Registration deadline must be before event date
      if (form.registration_deadline >= form.start_date) {
        alert("Registration deadline must be before event date");
        setLoading(false);
        return;
      }

      // Use the local preview URL only; no backend upload in frontend-only mode.
      const posterUrl = form.poster_url || undefined;

      // Map EventItem fields to backend Event fields
      const payload: any = {
        name: form.title,
        type: form.type.toLowerCase() as "tournament" | "event",
        date: form.start_date,
        time: form.start_time,
        location: form.location,
        format: form.format || "",
        description: form.description || "",
        registrationDeadline: form.registration_deadline || "",
        maxParticipants: form.max_participants,
        entryFee: `$${form.entry_fee}`,
        prizePool: form.prize_pool ? `$${form.prize_pool}` : "$0",
        status: form.status
      };

      // Only include poster if we have a URL
      if (posterUrl) {
        payload.poster = posterUrl;
      }

      if (editingId) {
        updateEvent(editingId, payload);
        setInfoMessage('Event updated successfully');
      } else {
        addEvent(payload);
        setInfoMessage('Event created successfully');
      }

      setEvents([...mockEvents]);
      setForm({
        type: "TOURNAMENT",
        title: "",
        description: "",
        start_date: "",
        start_time: "09:00",
        location: "",
        registration_deadline: "",
        max_participants: 50,
        entry_fee: 0,
        prize_pool: 0,
        format: "",
        status: "upcoming",
        poster_url: ""
      });
      setPosterFile(null);
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => setInfoMessage(null), 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save event');
    } finally {
      setLoading(false);
    }
  }

  function handleEditEvent(event: Event) {
    setForm({
      type: event.type.toUpperCase() as "EVENT" | "TOURNAMENT",
      title: event.name,
      description: event.description || "",
      start_date: event.date,
      start_time: event.time,
      location: event.location,
      registration_deadline: event.registrationDeadline || "",
      max_participants: event.maxParticipants,
      entry_fee: parseFloat(event.entryFee.replace(/[^0-9.]/g, '')) || 0,
      prize_pool: event.prizePool ? parseFloat(event.prizePool.replace(/[^0-9.]/g, '')) : 0,
      format: event.format || "",
      status: event.status,
      poster_url: event.poster || ""
    });
    setEditingId(event.id);
    setShowForm(true);
  }

  async function handleDeleteEvent(id: string) {
    if (!confirm("Are you sure you want to cancel this event?")) return;
    
    setLoading(true);
    setError(null);
    
    try {
      updateEvent(id, { status: "cancelled" });
      setEvents([...mockEvents]);
      setInfoMessage("Event cancelled successfully");
      setTimeout(() => setInfoMessage(null), 3000);
    } catch (err) {
      console.error("Cancel event error:", err);
      setError("Failed to cancel event");
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEdit() {
    setForm({
      type: "TOURNAMENT",
      title: "",
      description: "",
      start_date: "",
      start_time: "09:00",
      location: "",
      registration_deadline: "",
      max_participants: 50,
      entry_fee: 0,
      prize_pool: 0,
      format: "",
      status: "upcoming",
      poster_url: ""
    });
    setPosterFile(null);
    setEditingId(null);
    setShowForm(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#3b82f6';
      case 'ongoing': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

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
          padding: isMobile ? '1rem' : '3rem',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
          borderRadius: isMobile ? '16px' : '24px',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3rem',
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

          {error && <div style={{
            background: '#fef2f2',
            border: '2px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>{error}</div>}

          {infoMessage && <div style={{
            background: '#f0fdf4',
            border: '2px solid #bbf7d0',
            color: '#16a34a',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>{infoMessage}</div>}

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
            disabled={loading}
          >
            {editingId ? "Edit Event" : "Create Event/Tournament"}
          </button>
          {showForm && (
            <form 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem',
                background: 'rgba(240, 253, 244, 0.8)',
                padding: isMobile ? '1rem' : '1.5rem',
                borderRadius: '15px',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(22, 163, 74, 0.1)'
              }}
              onSubmit={handleCreateEvent}
            >
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <input
                  name="title"
                  placeholder="Event/Tournament Name *"
                  value={form.title}
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
                <select
                  name="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as "EVENT" | "TOURNAMENT" })}
                  required
                  style={{
                    padding: '0.8rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(22, 163, 74, 0.2)',
                    background: 'rgba(255,255,255,0.9)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <option value="EVENT">Event</option>
                  <option value="TOURNAMENT">Tournament</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <input
                  name="start_date"
                  type="date"
                  value={form.start_date}
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
                  name="start_time"
                  type="time"
                  value={form.start_time}
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
              </div>

              <input
                name="location"
                placeholder="Location (e.g. Main Golf Course) *"
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

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleInput}
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

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <input
                  name="registration_deadline"
                  type="date"
                  placeholder="Registration Deadline *"
                  value={form.registration_deadline}
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
                  name="max_participants"
                  type="number"
                  placeholder="Maximum Participants *"
                  value={form.max_participants}
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
              </div>

              <input
                name="entry_fee"
                type="number"
                placeholder="Entry Fee (in dollars) *"
                value={form.entry_fee}
                onChange={handleInput}
                required
                min="0"
                step="0.01"
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(22, 163, 74, 0.2)',
                  background: 'rgba(255,255,255,0.9)',
                  transition: 'all 0.3s ease'
                }}
              />

              {form.type === "TOURNAMENT" && (
                <>
                  <input
                    name="format"
                    placeholder="Format (e.g. Stroke Play, Match Play)"
                    value={form.format}
                    onChange={handleInput}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '10px',
                      border: '2px solid rgba(22, 163, 74, 0.2)',
                      background: 'rgba(255,255,255,0.9)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <input
                    name="prize_pool"
                    type="number"
                    placeholder="Prize Pool (in dollars)"
                    value={form.prize_pool}
                    onChange={handleInput}
                    min="0"
                    step="0.01"
                    style={{
                      padding: '0.8rem',
                      borderRadius: '10px',
                      border: '2px solid rgba(22, 163, 74, 0.2)',
                      background: 'rgba(255,255,255,0.9)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </>
              )}

              <select
                name="status"
                value={form.status}
                onChange={handleInput}
                required
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(22, 163, 74, 0.2)',
                  background: 'rgba(255,255,255,0.9)',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
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
                  name="poster_url"
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
                {form.poster_url && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img 
                      src={form.poster_url} 
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
                {editingId ? "Update Event" : "Create Event"}
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
            {loading && events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                No events found. Create your first event!
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  padding: isMobile ? '1rem' : '2rem',
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
                    background: `linear-gradient(90deg, ${getStatusColor(event.status)}, ${getStatusColor(event.status)}AA)`
                  }} />
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '1rem', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.75rem' : 0 }}>
                        <h2 style={{
                          fontSize: isMobile ? '1.35rem' : '1.8rem',
                          fontWeight: '700',
                          color: '#059669',
                          margin: 0,
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          wordBreak: 'break-word'
                        }}>{event.name}</h2>
                        <span style={{
                          background: getStatusColor(event.status),
                          color: 'white',
                          padding: '0.4rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {event.status}
                        </span>
                      </div>
                      
                      <span style={{
                        display: 'inline-block',
                        background: event.type === 'tournament' ? '#f0f9ff' : '#fef3c7',
                        color: event.type === 'tournament' ? '#0369a1' : '#92400e',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        marginBottom: '1rem'
                      }}>
                        {event.type === 'tournament' ? '🏆 Tournament' : '📅 Event'}
                      </span>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '1rem',
                      margin: '1rem 0',
                      padding: isMobile ? '1rem' : '1.5rem',
                      background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.8), rgba(236, 253, 245, 0.6))',
                      borderRadius: '16px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: isMobile ? '0.95rem' : '1rem',
                        color: '#1f2937',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}><strong>📅 Date:</strong> {event.date}</p>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                        <strong>🕐 Time:</strong> {event.time}
                      </p>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                        <strong>📍 Location:</strong> {event.location}
                      </p>
                      {event.format && (
                        <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                          <strong>🏌️ Format:</strong> {event.format}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                        <strong>👥 Max Participants:</strong> {event.maxParticipants}
                      </p>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                        <strong>💰 Entry Fee:</strong> {event.entryFee}
                      </p>
                      {event.prizePool && (
                        <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                          <strong>🏆 Prize Pool:</strong> {event.prizePool}
                        </p>
                      )}
                      {event.registrationDeadline && (
                        <p style={{ margin: 0, fontSize: isMobile ? '0.95rem' : '1rem', color: '#1f2937', fontWeight: '500', wordBreak: 'break-word' }}>
                          <strong>⏰ Reg. Deadline:</strong> {event.registrationDeadline}
                        </p>
                      )}
                    </div>
                    
                    {event.description && (
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
                      }}>{event.description}</p>
                    )}
                    
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexDirection: isMobile ? 'column' : 'row' }}>
                      <button 
                        style={{
                          padding: isMobile ? '0.7rem 1rem' : '0.75rem 1.5rem',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: isMobile ? '0.95rem' : '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)',
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                          width: isMobile ? '100%' : 'auto'
                        }}
                        onClick={() => handleEditEvent(event)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button 
                        style={{
                          padding: isMobile ? '0.7rem 1rem' : '0.75rem 1.5rem',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: isMobile ? '0.95rem' : '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #dc2626 100%)',
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                          width: isMobile ? '100%' : 'auto'
                        }}
                        onClick={() => handleDeleteEvent(event.id)}
                        disabled={loading}
                      >
                        Cancel Event
                      </button>
                    </div>
                  </div>
                  {event.poster && (
                    <div style={{ flexShrink: 0, width: isMobile ? '100%' : '150px', maxWidth: isMobile ? '220px' : '150px', margin: isMobile ? '0 auto' : '0' }}>
                      <img 
                        src={event.poster} 
                        alt={`${event.name} poster`} 
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
              ))
            )}
          </div>
        </div>
    </div>
    
    <Footer />
    </>
  );
}
