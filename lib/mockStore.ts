// Simple in-memory mock store for frontend-only mode
type Event = {
  id: string;
  name: string;
  type: 'tournament' | 'event';
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
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

type Booking = {
  id: string;
  name: string;
  date: string;
  time?: string;
  status: string;
  members: number;
  fullName?: string;
  email?: string;
  createdAt?: string;
};

type BookingEquipment = {
  id: string;
  bookingId: string;
  equipmentId: string;
  quantity: number;
  rentalPrice: string;
  createdAt: string;
  booking: Booking;
  equipment: {
    id: string;
    name: string;
    type: string;
    rentalPrice: string;
  };
};

type Equipment = {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
  condition: string;
  rentalPrice: string;
  addedDate: string;
};

// seed data
export const events: Event[] = [
  {
    id: 'e1',
    name: 'Spring Charity Tournament',
    type: 'tournament',
    date: '2026-05-20',
    time: '09:00',
    location: 'Main Golf Course',
    format: 'Stroke Play',
    description: 'A fundraising tournament for local charities.',
    registrationDeadline: '2026-05-15',
    maxParticipants: 72,
    entryFee: '$25',
    prizePool: '$1000',
    poster: '',
    status: 'upcoming',
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    name: 'Morning Tee',
    date: '2026-05-02',
    time: '08:00',
    status: 'confirmed',
    members: 4,
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    createdAt: '2026-05-01T08:00:00.000Z',
  },
];

export const equipment: Equipment[] = [
  {
    id: 'q1',
    name: 'Golf Cart Model A',
    type: 'Golf Carts',
    description: 'Electric cart with storage basket',
    quantity: 5,
    condition: 'good',
    rentalPrice: '$15/day',
    addedDate: '2026-05-01',
  },
  {
    id: 'q2',
    name: 'Range Finder',
    type: 'Accessories',
    description: 'Handheld range finder for distances',
    quantity: 10,
    condition: 'excellent',
    rentalPrice: '$8/day',
    addedDate: '2026-05-01',
  },
];

export const bookingEquipment: BookingEquipment[] = [
  {
    id: 'be1',
    bookingId: 'b1',
    equipmentId: 'q1',
    quantity: 2,
    rentalPrice: '$15',
    createdAt: '2026-05-01T08:00:00.000Z',
    booking: bookings[0],
    equipment: { id: 'q1', name: 'Golf Cart Model A', type: 'cart', rentalPrice: '$15' },
  },
];

export function makeId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function addEvent(payload: any) {
  const ev: Event = { id: makeId('e_'), status: 'upcoming', poster: '', ...payload };
  events.unshift(ev);
  return ev;
}

export function updateEvent(id: string, payload: any) {
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  events[idx] = { ...events[idx], ...payload };
  return events[idx];
}

export function deleteEvent(id: string) {
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  events.splice(idx, 1);
  return true;
}

export function addBooking(payload: any) {
  const b = { id: makeId('b_'), ...payload };
  bookings.unshift(b);
  return b;
}

export function cancelBooking(id: string) {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  bookings[idx].status = 'cancelled';
  return true;
}

export function addEquipment(payload: Omit<Equipment, 'id' | 'addedDate'>) {
  const item: Equipment = { id: makeId('q_'), addedDate: new Date().toISOString().split('T')[0], ...payload };
  equipment.unshift(item);
  return item;
}

export function updateEquipment(id: string, payload: Partial<Equipment>) {
  const idx = equipment.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  equipment[idx] = { ...equipment[idx], ...payload };
  return equipment[idx];
}

export function deleteEquipment(id: string) {
  const idx = equipment.findIndex((item) => item.id === id);
  if (idx === -1) return false;
  equipment.splice(idx, 1);
  return true;
}

export function removeBookingEquipment(id: string) {
  const idx = bookingEquipment.findIndex((item) => item.id === id);
  if (idx === -1) return false;
  bookingEquipment.splice(idx, 1);
  return true;
}
