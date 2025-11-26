const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

// In-memory stores (demo only)
const users = [];
const bookings = [];
const events = [];
const notifications = [];

// Helpers
function makeId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth
app.post('/api/auth/signup', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'user exists' });
  const user = { id: makeId('u_'), username, password, email: email || null, createdAt: new Date().toISOString() };
  users.push(user);
  return res.status(201).json({ user: { id: user.id, username: user.username, email: user.email } });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  // Return a fake token for demo
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
  return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// Bookings
app.get('/api/bookings', (req, res) => {
  res.json({ bookings });
});

app.post('/api/bookings', (req, res) => {
  const { name, date, members } = req.body;
  if (!name || !date) return res.status(400).json({ error: 'name and date required' });
  const b = { id: makeId('b_'), name, date, members: members || [], status: 'confirmed', createdAt: new Date().toISOString() };
  bookings.push(b);
  notifications.push({ id: makeId('n_'), type: 'booking', text: `New booking: ${name}`, createdAt: new Date().toISOString() });
  res.status(201).json({ booking: b });
});

// Events
app.get('/api/events', (req, res) => {
  res.json({ events });
});

app.post('/api/events', (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'title and date required' });
  const ev = { id: makeId('e_'), title, date, description: description || '', createdAt: new Date().toISOString() };
  events.push(ev);
  res.status(201).json({ event: ev });
});

// Notifications
app.get('/api/notifications', (req, res) => {
  res.json({ notifications });
});

// Analytics (sample)
app.get('/api/analytics', (req, res) => {
  const metrics = {
    activeUsers: users.length,
    totalBookings: bookings.length,
    totalEvents: events.length,
    since: new Date().toISOString(),
  };
  res.json({ metrics });
});

// Simple members endpoint
app.get('/api/members', (req, res) => {
  // return users as members (demo)
  res.json({ members: users.map(u => ({ id: u.id, username: u.username, email: u.email })) });
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
  console.log(`GolfTee backend listening on port ${PORT}`);
});
