
-- Add the booking_reference column to the bookings table to store a user-friendly reference ID.
ALTER TABLE public.bookings
ADD COLUMN booking_reference TEXT UNIQUE;

-- Add a comment to the new column for clarity.
COMMENT ON COLUMN public.bookings.booking_reference IS 'A user-friendly, unique reference for the booking.';
