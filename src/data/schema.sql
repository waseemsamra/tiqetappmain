-- Drop tables in reverse order of dependency to avoid foreign key constraints errors.
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS activity_types;

-- Create the activity_types table first as activities depends on it.
CREATE TABLE activity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create the activities table with a foreign key to activity_types.
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    duration TEXT,
    activitytypeid UUID REFERENCES activity_types(id) ON DELETE SET NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 0.0,
    images TEXT[],
    operatinghours TEXT,
    whatsincluded TEXT[],
    whatsnotincluded TEXT[],
    instructions TEXT,
    howtogetthere TEXT,
    additionalinfo TEXT,
    cancellationpolicy TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Optional: Create some sample activity types for easier testing.
INSERT INTO activity_types (name) VALUES
('Tour'),
('Adventure'),
('Cultural'),
('Sightseeing'),
('Food & Drink'),
('Desert Safari');
