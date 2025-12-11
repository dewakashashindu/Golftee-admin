# Equipment Booking Details Setup Guide

## Overview
I've created a comprehensive equipment booking details system that allows you to:
- View all equipment bookings with customer and equipment details
- Filter and search through bookings
- View detailed information in a modal
- Remove equipment from bookings
- Link bookings with specific equipment rentals

## What Was Created

### 1. Database Schema Updates (`backend/prisma/schema.prisma`)
- Added `Equipment` model with full details (name, type, condition, rental price, etc.)
- Added `BookingEquipment` junction table to link bookings with equipment
- Added relationships between Booking, Equipment, and BookingEquipment tables

### 2. Backend API Endpoints (`backend/server.js`)
New endpoints added:
- `GET /api/booking-equipment` - Get all equipment bookings with details
- `GET /api/booking-equipment/:bookingId` - Get equipment for a specific booking
- `POST /api/booking-equipment` - Add equipment to a booking
- `DELETE /api/booking-equipment/:id` - Remove equipment from a booking

### 3. Frontend Page (`app/equipment-bookings/page.tsx`)
A new page that displays:
- All equipment bookings in a card layout
- Customer information (name, email, phone, players)
- Equipment details (name, type, condition, quantity)
- Booking status badges
- Pricing calculations
- Search and filter functionality
- Detailed modal view for each booking

### 4. Navigation Update (`components/Navigation.tsx`)
- Added "Equipment Bookings" link to the navigation menu

## Setup Instructions

### Step 1: Update Database
Run the Prisma migration to create the new tables:

```bash
cd backend
npx prisma migrate dev --name add_equipment_booking_relationship
```

This will:
- Create the `Equipment` table
- Create the `BookingEquipment` junction table
- Add the necessary relationships

### Step 2: Generate Prisma Client
After migration, regenerate the Prisma client:

```bash
npx prisma generate
```

### Step 3: (Optional) Create Supabase Tables
If you're using Supabase directly (without Prisma), you need to create these tables manually:

**Equipment Table:**
```sql
CREATE TABLE equipment (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  condition TEXT DEFAULT 'good',
  rental_price TEXT DEFAULT '0',
  quantity INTEGER DEFAULT 1,
  description TEXT,
  image TEXT,
  location TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**BookingEquipment Junction Table:**
```sql
CREATE TABLE booking_equipment (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  equipment_id TEXT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  rental_price TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(booking_id, equipment_id)
);
```

### Step 4: Restart Backend Server
```bash
cd backend
npm start
```

Or if using nodemon:
```bash
npm run dev
```

### Step 5: Access the Equipment Bookings Page
Navigate to: `http://localhost:3000/equipment-bookings`

## Usage Guide

### Viewing Equipment Bookings
1. Navigate to "Equipment Bookings" in the navigation menu
2. View all bookings with their associated equipment
3. Use the search box to filter by customer name, email, or equipment
4. Filter by booking status (Confirmed, Pending, Completed, Cancelled)

### Adding Equipment to a Booking
To add equipment to a booking, make a POST request:

```javascript
const response = await fetch(`${BACKEND}/booking-equipment`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bookingId: 'booking_123',
    equipmentId: 'equipment_456',
    quantity: 2,
    rentalPrice: '50'
  })
});
```

### Viewing Booking Details
Click the eye icon (👁️) on any booking card to view full details in a modal.

### Removing Equipment from Booking
Click the delete icon (🗑️) on any booking card to remove the equipment association.

## Features

### Card View
- Customer information display
- Equipment details with icons
- Status badges (Confirmed, Pending, Cancelled, Completed)
- Condition badges (Excellent, Good, Fair, Needs Repair)
- Price calculations
- Action buttons (View, Delete)

### Search & Filter
- Search by customer name, email, or equipment name
- Filter by booking status
- Real-time filtering

### Detailed Modal
- Complete customer information
- Full booking details (date, time, status)
- Equipment specifications
- Quantity and pricing breakdown
- Equipment description

### Responsive Design
- Works on desktop, tablet, and mobile
- Grid layout adapts to screen size
- Touch-friendly buttons and interactions

## Testing

### Test Data
You can test with the existing equipment from the equipment page, or create test data:

```javascript
// Example: Add a booking with equipment
const booking = await fetch(`${BACKEND}/bookings`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    fullName: 'John Doe',
    date: '2025-12-15',
    startTime: '10:00',
    endTime: '12:00',
    email: 'john@example.com',
    phoneNo: '555-0100',
    members: 4
  })
});

const equipment = await fetch(`${BACKEND}/equipment`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Premium Golf Cart',
    type: 'Golf Carts',
    condition: 'excellent',
    rentalPrice: '45',
    quantity: 10,
    description: 'Electric golf cart with GPS'
  })
});

// Link them together
await fetch(`${BACKEND}/booking-equipment`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bookingId: booking.data.id,
    equipmentId: equipment.data.id,
    quantity: 2,
    rentalPrice: '45'
  })
});
```

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` in the `.env` file
- Check Supabase connection credentials
- Ensure database is accessible

### Prisma Client Issues
```bash
cd backend
npx prisma generate
```

### No Data Showing
- Verify backend is running on the correct port
- Check `NEXT_PUBLIC_API_URL` environment variable
- Open browser console for API errors
- Test endpoints directly: `http://localhost:4000/api/booking-equipment`

### Migration Errors
If migration fails, you can:
1. Check database connection
2. Manually apply SQL changes in Supabase dashboard
3. Use `npx prisma db push` instead (for development)

## Next Steps

### Potential Enhancements
1. **Add Equipment to Booking Form** - Create a form to add equipment when creating/editing bookings
2. **Equipment Availability** - Track and display real-time equipment availability
3. **Bulk Operations** - Add/remove multiple equipment items at once
4. **Export Data** - Export booking reports with equipment details
5. **Email Notifications** - Send confirmation emails with equipment details
6. **Calendar View** - View equipment bookings in a calendar format
7. **Analytics** - Track most popular equipment, revenue by equipment type

### Integration Points
- Link from Bookings page to Equipment Bookings
- Add equipment selection during booking creation
- Show equipment totals in Analytics page
- Add equipment history to customer profiles

## File Structure
```
GolfTee_adminportal/
├── app/
│   └── equipment-bookings/
│       └── page.tsx           # New equipment bookings page
├── backend/
│   ├── server.js              # Updated with new endpoints
│   └── prisma/
│       └── schema.prisma      # Updated with Equipment & BookingEquipment models
├── components/
│   └── Navigation.tsx         # Updated with new link
└── EQUIPMENT_BOOKING_SETUP.md # This file
```

## Support
If you encounter any issues:
1. Check the browser console for errors
2. Check the backend terminal for API errors
3. Verify database schema matches Prisma schema
4. Ensure all dependencies are installed (`npm install` in both root and backend)

---

**Created:** December 10, 2025  
**Version:** 1.0
