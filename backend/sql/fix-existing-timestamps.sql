-- Fix existing bookings created_at timestamps to Sri Lanka time (Asia/Colombo)
-- Sri Lanka is UTC+5:30, so add 5 hours 30 minutes to all existing created_at timestamps
-- 
-- USAGE: Run this in Supabase SQL editor to adjust all existing booking timestamps
-- 
-- ⚠️ WARNING: This will modify all booking records. Backup your data first!

UPDATE bookings
SET created_at = created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Colombo'
WHERE created_at IS NOT NULL;

-- Alternative if the above syntax doesn't work in your Supabase version:
-- UPDATE bookings
-- SET created_at = (created_at + INTERVAL '5 hours 30 minutes')
-- WHERE created_at IS NOT NULL;

-- Verify the update worked - check a few bookings:
SELECT id, created_at, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Colombo' as srilanka_time
FROM bookings
ORDER BY created_at DESC
LIMIT 5;
