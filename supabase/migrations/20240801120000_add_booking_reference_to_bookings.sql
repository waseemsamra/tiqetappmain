-- Add a booking_reference column to the bookings table
ALTER TABLE public.bookings
ADD COLUMN booking_reference TEXT;

-- Add a unique constraint to ensure booking references are unique
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_booking_reference_key UNIQUE (booking_reference);

-- Add a comment to describe the purpose of the new column
COMMENT ON COLUMN public.bookings.booking_reference IS 'Unique user-facing reference for a booking, e.g., RR-XYZ123.';
