-- Drop existing functions first to avoid signature conflicts
DROP FUNCTION IF EXISTS create_country(text, text, text, text);
DROP FUNCTION IF EXISTS update_country(text, text, text, text);
DROP FUNCTION IF EXISTS delete_country(text);


-- Function to create a country and a default city, and reorder if necessary.
CREATE OR REPLACE FUNCTION create_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO countries (code, name, currency, currency_symbol)
    VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to update a country
CREATE OR REPLACE FUNCTION update_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE countries
    SET
        name = p_name,
        currency = p_currency,
        currency_symbol = p_currency_symbol
    WHERE
        code = p_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to delete a country and its cities
CREATE OR REPLACE FUNCTION delete_country(
    p_code TEXT
)
RETURNS VOID AS $$
BEGIN
    -- Delete associated cities first to maintain referential integrity
    DELETE FROM cities WHERE country_code = p_code;
    
    -- Then delete the country
    DELETE FROM countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
