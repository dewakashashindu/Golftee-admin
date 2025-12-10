# GolfTee Admin Portal - Comprehensive Project Report
**Date:** December 7, 2025  
**Repository:** https://github.com/acoroot/GolfTee_adminportal  
**Branch:** `backend-update`

---

## 📋 Project Overview

GolfTee Admin Portal is a full-stack golf booking management system designed for administrators to view, manage, filter, and cancel golf course bookings. The system includes professional email notifications when bookings are cancelled.

**Tech Stack:**
- **Frontend:** Next.js 15.5.6 with Turbopack, React 19.1.0, TypeScript, Tailwind CSS
- **Backend:** Express.js with Node.js, Prisma ORM, Nodemailer
- **Database:** Supabase (PostgreSQL) for production, SQLite for local development
- **Authentication:** JWT-based with bcryptjs hashing
- **Email Service:** Gmail SMTP via Nodemailer

---

## 🎯 Core Features

### 1. **Booking Management Dashboard**
- **Location:** `app/bookings/page.tsx`
- **Features:**
  - View all golf course bookings in a responsive table
  - Display 12 key columns per booking:
    - Booking ID (unique UUID identifier)
    - Customer Name (fetched from users table)
    - Phone Number (from customer profile)
    - Course Name (formatted from database)
    - Date (booking date)
    - Start Time (course session start)
    - End Time (automatically calculated)
    - Players (number of paying customers)
    - Non-Players (accompanying guests)
    - Payment Status (UNPAID/PAID)
    - Booking Status (PENDING/CANCELLED)
    - Created At (timestamp of booking creation)

### 2. **Advanced Filtering System**
- **Filter Options:**
  - All Bookings (default)
  - Today's Bookings
  - This Week's Bookings
  - This Month's Bookings
  - Custom Date Selection
- **Implementation:** Real-time filtering with date normalization to handle timezone issues
- **Display:** Shows count of filtered results

### 3. **Booking Cancellation Feature**
- **User Flow:**
  1. Admin clicks "Cancel" button on any booking
  2. Confirmation dialog appears to prevent accidental cancellations
  3. Backend updates booking status to "Cancelled"
  4. Booking remains visible in table (not deleted)
  5. Customer receives professional cancellation email
  6. Cancel button becomes disabled after cancellation
- **Backend Endpoint:** `PUT /api/bookings/:id/cancel`
- **Features:**
  - Works with Supabase, Prisma, and in-memory fallback
  - Email sent only if customer email exists
  - Graceful error handling (email failures don't break the API)

### 4. **Email Notification System**
- **Service:** `backend/utils/emailService.js`
- **Provider:** Gmail SMTP with Nodemailer
- **Email Template:** Professional HTML design with:
  - GolfTee branding (golf icon ⛳)
  - Mobile-responsive layout
  - Booking details card
  - Clear cancellation notice
  - Call-to-action button ("Book Again")
  - Professional footer
- **Data in Email:**
  - Booking ID
  - Customer Name
  - Course Name
  - Date & Time
  - Number of Players
  - Cancellation status
- **Configuration:** 
  - `EMAIL_USER=official.golftee@gmail.com`
  - `EMAIL_PASS=tbfuembobggocwbl` (App Password)

### 5. **Responsive Design**
- **Desktop View:** Full table layout with all columns visible
- **Tablet View:** Reduced padding and font sizes
- **Mobile View:** Card-based layout displaying key information
  - Each booking shown as an interactive card
  - Essential details in 2-column grid
  - Touch-friendly button sizes
- **Breakpoints:** 1400px, 1200px, 1024px, 968px, 800px, 640px, 480px, 360px

### 6. **Data Normalization & Field Mapping**
- **Problem Solved:** Backend and Supabase use different field naming conventions
- **Solution:** Frontend normalization layer handling multiple field name variations:
  ```javascript
  fullName: b.fullName || b.customer_name || b.name || b.customer?.name || b.user?.name
  phoneNo: b.phoneNo || b.phone || b.phone_number || b.customer?.phone || b.user?.phone
  courseName: b.courseName || b.court_name || b.course || b.course_name
  bookingStatus: b.bookingStatus || b.status
  paymentStatus: b.paymentStatus || b.payment_status
  // ... etc
  ```
- **Features:** Empty string handling, nested object support, sensible defaults

### 7. **User Data Integration**
- **Backend Query:** Fetches bookings and users separately
- **Lookup System:** User map created for efficient O(1) lookups
- **Data Joined:** Customer name and phone matched from users table via `user_id`
- **Result:** All bookings display actual customer information instead of "N/A"

### 8. **Status Badge System**
- **Styles:**
  - `.confirmed` → Green background (#dcfce7), green text (#16a34a)
  - `.pending` → Yellow background (#fef3c7), orange text (#d97706)
  - `.cancelled` → Red background (#fee2e2), red text (#dc2626)
- **Applied To:** Payment Status and Booking Status columns
- **Uppercase Display:** Status automatically converted to uppercase (PENDING, CANCELLED, etc.)

### 9. **Cancel Button Styling**
- **Normal State:** Red background (#dc2626), white text
- **Hover State:** Darker red (#b91c1c) with shadow effect
- **Disabled State:** Grayed out (opacity 0.6), shows "Cancelled" text
- **Behavior:** Disabled after cancellation to prevent duplicate cancellations

---

## 🏗️ Architecture

### Frontend Structure
```
app/
├── bookings/
│   └── page.tsx          # Main bookings management page
├── home/
│   └── page.tsx          # Home/dashboard page
├── login/
│   └── page.tsx          # Authentication page
├── layout.tsx            # Root layout
└── page.tsx              # Index page
components/
├── Navigation.tsx        # Top navigation bar
├── Footer.tsx            # Footer component
└── PageTransition.tsx    # Page transition effects
lib/
├── api.ts               # API utility functions
└── config.ts            # Configuration constants
```

### Backend Structure
```
backend/
├── server.js            # Main Express server (602 lines)
├── supabaseClient.js    # Supabase initialization
├── package.json         # Backend dependencies
├── .env                 # Environment variables (git ignored)
├── utils/
│   └── emailService.js  # Email sending service
└── prisma/
    ├── schema.prisma    # Database schema
    ├── seed.js          # Database seeding script
    └── migrations/      # Database migrations
        └── 20251130052017_init/
            └── migration.sql
```

### Database Schema (Prisma/SQLite)
```
User
├── id (CUID)
├── username (unique)
├── email
├── password (bcrypt hashed)
├── createdAt
└── bookings (relation)

Booking
├── id (CUID)
├── name / fullName
├── date
├── startTime / endTime
├── members / noPlayers / nonPlayers
├── email / phoneNo
├── status (confirmed/cancelled/pending)
├── createdAt
├── user (relation via userId)
└── userId (foreign key)

Event
├── id
├── title
├── date
├── description
└── createdAt

Notification
├── id
├── type
├── text
└── createdAt
```

---

## 🔧 API Endpoints

### Bookings Endpoints

**GET /api/bookings**
- **Purpose:** Fetch all bookings with user data
- **Response:**
  ```json
  {
    "bookings": [
      {
        "id": "87228ef3-...",
        "fullName": "John Doe",
        "phoneNo": "0771234567",
        "courseName": "Royal Colombo Golf Club",
        "date": "2026-01-30",
        "startTime": "07:30:00",
        "endTime": "08:30",
        "noPlayers": 2,
        "nonPlayers": 1,
        "paymentStatus": "Unpaid",
        "bookingStatus": "PENDING",
        "createdAt": "2025-12-07T11:12:58.355335"
      }
    ]
  }
  ```
- **Processing:**
  1. Fetches bookings from Supabase
  2. Fetches all users
  3. Creates user lookup map
  4. Transforms booking data to frontend schema
  5. Returns merged data with customer info

**PUT /api/bookings/:id/cancel**
- **Purpose:** Cancel a booking and send notification email
- **Processing:**
  1. Retrieves booking and associated user
  2. Updates booking status to "Cancelled"
  3. Sends professional cancellation email
  4. Returns updated booking
- **Response:**
  ```json
  {
    "message": "Booking cancelled and email sent",
    "data": { booking object with updated status }
  }
  ```

### Authentication Endpoints

**POST /api/auth/login**
- Authenticates user with username/password
- Returns JWT token for future requests

**POST /api/bookings** (protected)
- Creates new booking
- Requires JWT authentication

---

## 📦 Dependencies

### Frontend Dependencies
- `next@15.5.6` - React framework with Turbopack
- `react@19.1.0` - UI library
- `react-dom@19.1.0` - DOM rendering
- `tailwindcss@4.1.14` - CSS utility framework
- `chart.js@4.5.1` - Charting library
- `react-chartjs-2@5.3.0` - Chart integration
- `framer-motion@12.23.24` - Animation library
- `autoprefixer@10.4.21` - CSS processing
- `postcss@8.5.6` - CSS transformation
- `typescript@5` - Type safety

### Backend Dependencies
- `express@4.18.2` - Web framework
- `@prisma/client@4.14.0` - Database ORM
- `@supabase/supabase-js@2.85.0` - Supabase client
- `nodemailer@7.0.11` - Email sending
- `jsonwebtoken@9.0.2` - JWT authentication
- `bcryptjs@3.0.3` - Password hashing
- `cors@2.8.5` - Cross-origin requests
- `morgan@1.10.0` - Request logging
- `dotenv@16.6.1` - Environment variables
- `zod@4.1.13` - Data validation
- `nodemon@2.0.22` (dev) - Auto-restart during development

---

## 🔐 Security Features

1. **Password Hashing:** bcryptjs with salt rounds
2. **JWT Authentication:** Token-based access control
3. **CORS Protection:** Configured with `origin: true`
4. **Environment Secrets:** 
   - `.env` file in `.gitignore`
   - Email credentials not committed to repository
   - Supabase keys stored locally
5. **Email Service:** Graceful error handling (failures don't break API)
6. **Input Validation:** Zod schema validation for requests

---

## 📊 Recent Changes (Commits)

| Commit | Message | Changes |
|--------|---------|---------|
| d503a93 | Update email template with professional GolfTee design | Enhanced HTML email with branding, responsive layout |
| 29ff086 | Add email notifications for booking cancellations | Nodemailer integration, emailService.js, environment config |
| 7ddeeb5 | Add booking cancellation feature | PUT /api/bookings/:id/cancel endpoint, cancel button UI |
| bd2f746 | Fix customer name and phone display | User lookup system, Supabase users table join |
| 5cd71a3 | Update bookings table to 12 columns | Redesigned table structure, added all required booking fields |

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- npm or yarn
- Gmail account with app-specific password configured

### Backend Setup
```bash
cd backend
npm install
# Configure .env with:
# - SUPABASE_URL
# - SUPABASE_KEY
# - EMAIL_USER=official.golftee@gmail.com
# - EMAIL_PASS=tbfuembobggocwbl
npm run dev
# Runs on http://localhost:5000
```

### Frontend Setup
```bash
npm install
npm run dev
# Runs on http://localhost:3001 (or 3000 if available)
```

### Access Admin Portal
Navigate to: `http://localhost:3001/bookings`

---

## ✨ Key Features Summary

| Feature | Status | Implementation |
|---------|--------|-----------------|
| View all bookings | ✅ Complete | Table + Card responsive layouts |
| Filter by date | ✅ Complete | Today/Week/Month/Custom options |
| Display customer info | ✅ Complete | Fetched from users table |
| Cancel bookings | ✅ Complete | PUT endpoint with status update |
| Send cancellation email | ✅ Complete | Nodemailer with professional template |
| Data normalization | ✅ Complete | Handles multiple field name variations |
| Responsive design | ✅ Complete | 9 breakpoints for all devices |
| Status badges | ✅ Complete | Color-coded by status type |
| Real-time filtering | ✅ Complete | Instant updates on filter change |
| Mobile optimization | ✅ Complete | Touch-friendly card layout |

---

## 📝 Notes

- Booking records are **not deleted** when cancelled - they're marked with `status: "Cancelled"`
- Email notifications are **optional** - if email service is down, cancellations still work
- All customer data is **fetched fresh** for each API call (no caching)
- Frontend normalizes data to handle backend schema variations
- Project uses **Supabase for production, SQLite for local development**

---

## 🔗 Repository Links

- **Main Repo:** https://github.com/acoroot/GolfTee_adminportal
- **Current Branch:** `backend-update`
- **Default Branch:** `main`

---

**Report Generated:** December 7, 2025  
**Status:** ✅ All Core Features Implemented and Tested
