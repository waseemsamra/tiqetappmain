-- Tiqets Products Cache Table
-- This table stores cached product data for fast keyword search

DROP TABLE IF EXISTS tiqets_products CASCADE;
DROP TABLE IF EXISTS helicopter_tours CASCADE;

-- Main products table with search-optimized fields
CREATE TABLE tiqets_products (
    id SERIAL PRIMARY KEY,
    tiqets_product_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    tagline TEXT,
    city_id VARCHAR(50),
    city_name VARCHAR(100),
    country_name VARCHAR(100),
    price DECIMAL(10,2),
    currency VARCHAR(3),
    duration VARCHAR(100),
    rating DECIMAL(3,2),
    reviews_total INTEGER,
    image_url TEXT,
    experience_url TEXT,
    search_keywords TEXT[],
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(tagline, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(city_name, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(country_name, '')), 'C')
    ) STORED,
    last_synced TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Dedicated table for helicopter tours (fast lookup)
CREATE TABLE helicopter_tours (
    id SERIAL PRIMARY KEY,
    tiqets_product_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    tagline TEXT,
    city_name VARCHAR(100),
    country_name VARCHAR(100),
    price DECIMAL(10,2),
    currency VARCHAR(3),
    duration VARCHAR(100),
    rating DECIMAL(3,2),
    reviews_total INTEGER,
    image_url TEXT,
    experience_url TEXT,
    last_verified TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast search
CREATE INDEX idx_tiqets_products_search ON tiqets_products USING GIN(search_vector);
CREATE INDEX idx_tiqets_products_keywords ON tiqets_products USING GIN(search_keywords);
CREATE INDEX idx_tiqets_products_city ON tiqets_products(city_name);
CREATE INDEX idx_tiqets_products_country ON tiqets_products(country_name);
CREATE INDEX idx_helicopter_tours_city ON helicopter_tours(city_name);
CREATE INDEX idx_helicopter_tours_rating ON helicopter_tours(rating DESC NULLS LAST);

-- Insert known cities for helicopter tours
CREATE TABLE IF NOT EXISTS tiqets_cities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_code VARCHAR(2),
    last_synced TIMESTAMP DEFAULT NOW()
);

INSERT INTO tiqets_cities (id, name, country_code) VALUES
('60005', 'Dubai', 'AE'),
('260932', 'New York', 'US'),
('75061', 'Amsterdam', 'NL'),
('67458', 'London', 'GB')
ON CONFLICT (id) DO NOTHING;