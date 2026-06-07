
-- Add the new columns to the bookings table
ALTER TABLE "public"."bookings"
ADD COLUMN "quantity" integer NOT NULL DEFAULT 1,
ADD COLUMN "total_price" numeric NOT NULL DEFAULT 0.00,
ADD COLUMN "booking_reference" text;

-- Add a unique constraint to the booking_reference column
-- This ensures that every booking has a unique reference number
ALTER TABLE "public"."bookings"
ADD CONSTRAINT "bookings_booking_reference_key" UNIQUE ("booking_reference");

-- Create an index on the booking_reference column for faster lookups
CREATE INDEX IF NOT EXISTS "idx_booking_reference" ON "public"."bookings" USING "btree" ("booking_reference");

-- Backfill existing rows with default values if you have any
-- This is commented out but can be useful if you have existing data
/*
UPDATE "public"."bookings"
SET "booking_reference" = 'RR-' || substr(md5(random()::text), 0, 10)
WHERE "booking_reference" IS NULL;
*/

-- Now, make the booking_reference column NOT NULL after backfilling
ALTER TABLE "public"."bookings"
ALTER COLUMN "booking_reference" SET NOT NULL;
