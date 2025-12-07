const express = require('express');
// load environment variables from .env when present
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

// Prisma client for persistence
let prisma;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (e) {
  // Prisma client not installed or not generated yet — continue with in-memory fallback
  console.warn('Prisma client not available, using in-memory stores');
  prisma = null;
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

// Simple request logging middleware to capture request id, time and body for debugging
app.use((req, res, next) => {
  req._startTime = Date.now();
  // Log incoming request summary
  console.log(`[REQ] ${req.method} ${req.originalUrl} - from ${req.ip} - body=${JSON.stringify(req.body || {})}`);
  // capture finish to log response time
  res.on('finish', () => {
    const ms = Date.now() - req._startTime;
    console.log(`[RES] ${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });
  next();
});

// In-memory stores (demo only / fallback)
const users = [];
const bookings = [];
const events = [];
const notifications = [];

// Supabase client (optional - requires SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY in env)
const supabase = require('./supabaseClient');

// Helpers
function makeId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}
// Validation helper and Zod schemas (placed early so routes can reference them)
function validate(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({ body: req.body, params: req.params, query: req.query });
      req.valid = parsed;
      return next();
    } catch (err) {
      // Zod error format
      if (err?.errors) return res.status(400).json({ error: err.errors });
      return res.status(400).json({ error: err.message || String(err) });
    }
  };
}

const signupSchema = z.object({
  body: z.object({ username: z.string().min(3), password: z.string().min(6), email: z.string().email().optional() })
});

const loginSchema = z.object({
  body: z.object({ username: z.string().min(1), password: z.string().min(1) })
});

const bookingSchema = z.object({
  body: z.object({ name: z.string().min(1), date: z.string().min(4), members: z.union([z.number().int().nonnegative(), z.string(), z.undefined()]).optional(), user_id: z.string().optional() })
});

const eventSchema = z.object({
  body: z.object({ title: z.string().min(1), date: z.string().min(4), description: z.string().optional() })
});

const adminBookingSchema = z.object({ row: z.record(z.any()) });


// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth
app.post('/api/auth/signup', validate(signupSchema), async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (supabase) {
    try {
      // Use Supabase Auth to create the user (requires service role key)
      const { data: createdUser, error: createErr } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { username }
      });
      if (createErr) return res.status(500).json({ error: createErr.message });

      // Optionally insert profile into public.users table for easier querying
      try {
        const { data: profileData, error: profileErr } = await supabase.from('users').insert([{ id: createdUser.id, username, email }]).select().single();
        if (profileErr) console.warn('profile insert error:', profileErr.message);
      } catch (e) {
        console.warn('profile insert exception', e?.message || e);
      }

      return res.status(201).json({ user: createdUser });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const exists = await prisma.user.findFirst({ where: { username } });
      if (exists) return res.status(409).json({ error: 'user exists' });
      const hashed = await bcrypt.hash(password, 10);
      const created = await prisma.user.create({ data: { username, email: email || null, password: hashed } });
      return res.status(201).json({ user: { id: created.id, username: created.username, email: created.email } });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'user exists' });
  const user = { id: makeId('u_'), username, password, email: email || null, createdAt: new Date().toISOString() };
  users.push(user);
  return res.status(201).json({ user: { id: user.id, username: user.username, email: user.email } });
});

app.post('/api/auth/login', validate(loginSchema), async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  if (supabase) {
    try {
      // Try to sign in via Supabase Auth. This will return a session with access token.
      // Note: client-side apps normally call Supabase Auth directly; here we use server to sign in for demo.
      const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
        email: username,
        password
      });
      if (signInErr || !signInData) return res.status(401).json({ error: signInErr?.message || 'invalid credentials' });
      // return access token and user
      const token = signInData?.session?.access_token || null;
      return res.json({ token, user: signInData.user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) return res.status(401).json({ error: 'invalid credentials' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: 'invalid credentials' });
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  // Return a fake token for demo
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
  return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  if (supabase) {
    try {
      // Fetch bookings data
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (bookingsError) {
        console.log('Supabase error:', bookingsError);
        return res.status(500).json({ error: bookingsError.message });
      }

      // Fetch all users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, name, email, phoneNumber');
      
      if (usersError) {
        console.log('Users fetch error:', usersError);
      }

      // Create a user lookup map
      const userMap = new Map();
      if (users) {
        users.forEach(user => userMap.set(user.id, user));
      }

      // Log first booking to see actual field names
      if (bookings && bookings.length > 0) {
        console.log('First booking from Supabase:', JSON.stringify(bookings[0], null, 2));
        const user = userMap.get(bookings[0].user_id);
        if (user) {
          console.log('Matched user:', JSON.stringify(user, null, 2));
        }
      }

      // Transform Supabase data to match frontend expectations
      const transformed = (bookings || []).map(booking => {
        const user = userMap.get(booking.user_id);
        return {
          id: booking.id,
          fullName: user?.name || 'N/A',
          phoneNo: user?.phoneNumber || 'N/A',
          courseName: booking.court_name?.replace(/_/g, ' ') || 'N/A',
          date: booking.date,
          startTime: booking.time,
          endTime: calculateEndTime(booking.date, booking.time, booking.duration_minutes),
          noPlayers: booking.players_count || 0,
          nonPlayers: booking.non_players_count || 0,
          paymentStatus: booking.payment_status || 'UNPAID',
          bookingStatus: booking.status?.toUpperCase() || 'PENDING',
          createdAt: booking.created_at,
        };
      });
      
      return res.json({ bookings: transformed });
    } catch (err) {
      console.error('Bookings error:', err);
      return res.status(500).json({ error: err.message });
    }
  }
  if (prisma) {
    try {
      const data = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
      return res.json({ bookings: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  return res.json({ bookings });
});

// Helper function to calculate end time; returns HH:MM formatted string
function calculateEndTime(dateStr, startTime, durationMinutes) {
  if (!startTime || !durationMinutes) return null;
  try {
    const baseDate = dateStr ? `${dateStr}T${startTime}` : `1970-01-01T${startTime}`;
    const start = new Date(baseDate);
    if (Number.isFinite(durationMinutes)) {
      start.setMinutes(start.getMinutes() + Number(durationMinutes));
    }
    const hh = String(start.getHours()).padStart(2, '0');
    const mm = String(start.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  } catch (e) {
    return null;
  }
}

// Auth middleware - verify Bearer token using Supabase
async function verifyToken(req, res, next) {
  // Supabase-backed apps use supabase tokens
  if (supabase) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
    const token = auth.split(' ')[1];
    try {
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data?.user) return res.status(401).json({ error: 'invalid token' });
      req.user = data.user;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'invalid token' });
    }
  }

  // Fallback: verify JWT signed by this server
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach minimal user info
    req.user = { id: decoded.userId, username: decoded.username };
    // if prisma is available, attach full user object
    if (prisma) {
      try {
        const full = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (full) req.user = full;
      } catch (e) {
        // ignore
      }
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}


app.post('/api/bookings', verifyToken, validate(bookingSchema), async (req, res) => {
  const { name, date, members, user_id } = req.body;
  if (!name || !date) return res.status(400).json({ error: 'name and date required' });

  if (supabase) {
    try {
      const { data, error } = await supabase.from('bookings').insert([{ name, date, members: members || [], user_id }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      await supabase.from('notifications').insert([{ type: 'booking', text: `New booking: ${name}` }]);
      return res.status(201).json({ booking: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const created = await prisma.booking.create({ data: {
        name,
        date,
        members: Number(members) || 0,
        status: 'confirmed',
        userId: user_id || null,
      } });
      await prisma.notification.create({ data: { type: 'booking', text: `New booking: ${name}` } });
      return res.status(201).json({ booking: created });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const b = { id: makeId('b_'), name, date, members: members || [], status: 'confirmed', createdAt: new Date().toISOString() };
  bookings.push(b);
  notifications.push({ id: makeId('n_'), type: 'booking', text: `New booking: ${name}`, createdAt: new Date().toISOString() });
  res.status(201).json({ booking: b });
});

// Cancel a booking (mark as cancelled instead of deleting)
app.put('/api/bookings/:id/cancel', async (req, res) => {
  const { id } = req.params;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'Cancelled' })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ message: 'Booking cancelled', data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const updated = await prisma.booking.update({
        where: { id },
        data: { status: 'cancelled' },
      });
      return res.json({ message: 'Booking cancelled', data: updated });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const bookingIndex = bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[bookingIndex].status = 'cancelled';
  res.json({ message: 'Booking cancelled', data: bookings[bookingIndex] });
});

// Events
app.get('/api/events', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ events: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const data = await prisma.event.findMany({ orderBy: { date: 'desc' } });
      return res.json({ events: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ events });
});

app.post('/api/events', validate(eventSchema), async (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'title and date required' });

  if (supabase) {
    try {
      const { data, error } = await supabase.from('events').insert([{ title, date, description: description || '' }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ event: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const created = await prisma.event.create({ data: { title, date, description: description || '' } });
      return res.status(201).json({ event: created });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const ev = { id: makeId('e_'), title, date, description: description || '', createdAt: new Date().toISOString() };
  events.push(ev);
  res.status(201).json({ event: ev });
});

// Notifications
app.get('/api/notifications', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ notifications: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const data = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' } });
      return res.json({ notifications: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ notifications });
});

// Analytics (sample)
app.get('/api/analytics', async (req, res) => {
  if (supabase) {
    try {
      const [{ count: usersCount }, { count: bookingsCount }, { count: eventsCount }] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact' }).limit(1),
        supabase.from('bookings').select('*', { count: 'exact' }).limit(1),
        supabase.from('events').select('*', { count: 'exact' }).limit(1),
      ]);
      const metrics = {
        activeUsers: usersCount.count || 0,
        totalBookings: bookingsCount.count || 0,
        totalEvents: eventsCount.count || 0,
        since: new Date().toISOString(),
      };
      return res.json({ metrics });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const [usersCount, bookingsCount, eventsCount] = await Promise.all([
        prisma.user.count(),
        prisma.booking.count(),
        prisma.event.count(),
      ]);
      const metrics = {
        activeUsers: usersCount || 0,
        totalBookings: bookingsCount || 0,
        totalEvents: eventsCount || 0,
        since: new Date().toISOString(),
      };
      return res.json({ metrics });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const metrics = {
    activeUsers: users.length,
    totalBookings: bookings.length,
    totalEvents: events.length,
    since: new Date().toISOString(),
  };
  res.json({ metrics });
});

// Simple members endpoint
app.get('/api/members', async (req, res) => {
  if (supabase) {
    try {
      // First try reading from public.users table (your DB appears to store profiles there)
      const { data, error } = await supabase.from('users').select('id, name, email, role').order('created_at', { ascending: false });
      if (!error && data) {
        return res.json({ members: data });
      }

      // Fallback: use Supabase Auth admin API to list users
      const { data: listData, error: listErr } = await supabase.auth.admin.listUsers();
      if (listErr) {
        console.error('listUsers error:', listErr);
        return res.status(500).json({ error: listErr.message });
      }
      const users = (listData?.users || []).map(u => ({ id: u.id, username: (u.user_metadata && u.user_metadata.username) || null, email: u.email }));
      return res.json({ members: users });
    } catch (err) {
      console.error('members route exception:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      const list = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, username: true, email: true } });
      return res.json({ members: list });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // return users as members (demo)
  res.json({ members: users.map(u => ({ id: u.id, username: u.username, email: u.email })) });
});

// Temporary admin-only booking insert (uses service-role key). Remove in production.
app.post('/api/admin/bookings', validate(adminBookingSchema), async (req, res) => {
  // Admin-only direct insert: accepts a `row` object with exact columns for your bookings table.
  const { row } = req.body || {};
  if (!row || typeof row !== 'object') return res.status(400).json({ error: 'provide a `row` object with booking columns' });
  if (supabase) {
    try {
      const { data, error } = await supabase.from('bookings').insert([row]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ booking: data });
    } catch (err) {
      console.error('admin booking insert error', err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (prisma) {
    try {
      // map row fields to prisma create data safely
      const createData = {
        name: row.name || row.title || 'admin booking',
        date: row.date || new Date().toISOString().split('T')[0],
        members: Number(row.members) || 0,
        status: row.status || 'confirmed',
        userId: row.user_id || row.userId || null,
      };
      const created = await prisma.booking.create({ data: createData });
      return res.status(201).json({ booking: created });
    } catch (err) {
      console.error('admin booking insert error', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(404).json({ error: 'no database configured' });
});

// Admin: list all bookings (secured)
app.get('/api/bookings/admin/all', verifyToken, async (req, res) => {
  // Only allow if token verified (verifyToken attaches req.user)
  try {
    if (supabase) {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ bookings: data });
    }

    if (prisma) {
      const data = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
      return res.json({ bookings: data });
    }

    // fallback in-memory
    return res.json({ bookings });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
  console.log(`GolfTee backend listening on port ${PORT}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV || 'development'}, DB=${prisma ? 'prisma' : (supabase ? 'supabase' : 'in-memory')}`);
});

// Central error handler (logs stack and returns JSON)
app.use((err, req, res, next) => {
  console.error('[ERROR] Unhandled error in request:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(err?.status || 500).json({ error: err?.message || 'internal server error' });
});

// Log and exit on uncaught exceptions / unhandled rejections to avoid silent failures
process.on('uncaughtException', (err) => {
  console.error('[FATAL] uncaughtException:', err && err.stack ? err.stack : err);
  // give logs a moment to flush then exit
  setTimeout(() => process.exit(1), 100);
});

process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] unhandledRejection:', reason && reason.stack ? reason.stack : reason);
  setTimeout(() => process.exit(1), 100);
});

