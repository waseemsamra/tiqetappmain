
ALTER TABLE bookings
ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1,
ADD COLUMN total_price NUMERIC(10, 2) NOT NULL DEFAULT 0;

COMMENT ON COLUMN bookings.quantity IS 'The number of tickets or items included in the booking.';
COMMENT ON COLUMN bookings.total_price IS 'The total price paid for the booking.';
