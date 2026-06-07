
-- Enable pgcrypto for UUID generation if not already enabled
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- Function: create_country
-- Description: Creates a new country and ensures data integrity.
-- Parameters:
--   p_code: The 2-character country code (e.g., 'US').
--   p_name: The name of the country (e.g., 'United States').
--   p_currency: The currency code (e.g., 'USD').
--   p_currency_symbol: The currency symbol (e.g., '$').
-- Returns: The newly created country record.
-- =============================================
CREATE OR REPLACE FUNCTION create_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS SETOF countries AS $$
BEGIN
    IF LENGTH(p_code) != 2 THEN
        RAISE EXCEPTION 'Country code must be exactly 2 characters.';
    END IF;

    IF EXISTS (SELECT 1 FROM countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code "%" already exists.', p_code;
    END IF;

    IF EXISTS (SELECT 1 FROM countries WHERE name = p_name) THEN
        RAISE EXCEPTION 'Country with name "%" already exists.', p_name;
    END IF;

    INSERT INTO countries (code, name, currency, currency_symbol)
    VALUES (p_code, p_name, p_currency, p_currency_symbol);

    RETURN QUERY SELECT * FROM countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;


-- =============================================
-- Function: update_country
-- Description: Updates an existing country's details.
-- Parameters:
--   p_code: The code of the country to update.
--   p_name: The new name for the country.
--   p_currency: The new currency for the country.
--   p_currency_symbol: The new currency symbol for the country.
-- Returns: The updated country record.
-- =============================================
CREATE OR REPLACE FUNCTION update_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS SETOF countries AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code "%" not found.', p_code;
    END IF;

    IF EXISTS (SELECT 1 FROM countries WHERE name = p_name AND code != p_code) THEN
        RAISE EXCEPTION 'Another country with name "%" already exists.', p_name;
    END IF;

    UPDATE countries
    SET 
        name = p_name,
        currency = p_currency,
        currency_symbol = p_currency_symbol
    WHERE code = p_code;

    RETURN QUERY SELECT * FROM countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;


-- =============================================
-- Function: delete_country
-- Description: Deletes a country and all of its associated cities.
-- Parameters:
--   p_code: The code of the country to delete.
-- Returns: void
-- =============================================
CREATE OR REPLACE FUNCTION delete_country(p_code TEXT)
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code "%" not found.', p_code;
    END IF;

    -- First, delete all cities associated with this country
    DELETE FROM cities WHERE country_code = p_code;

    -- Then, delete the country itself
    DELETE FROM countries WHERE code = p_code;

END;
$$ LANGUAGE plpgsql;
