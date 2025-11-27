"use client";
import { useState, useEffect } from "react";

type Booking = { id: string; [key: string]: any };

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoadingBookings(true);
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        // backend returns { bookings: [...] }
        const list = Array.isArray(data.bookings) ? data.bookings : [];
        setBookings(list);
      })
      .catch((err) => {
        console.error('Failed to fetch bookings', err);
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoadingBookings(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loadingBookings) return <div>Loading bookings</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bookings || bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bookings</h1>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>{b.id}{b.name ? ` — ${b.name}` : ''}{b.date ? ` @ ${b.date}` : ''}</li>
        ))}
      </ul>
    </div>
  );
}
