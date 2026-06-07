-- Seed data for countries
INSERT INTO countries (code, name, currency, currency_symbol) VALUES
('AR', 'Argentina', 'ARS', '$'),
('AW', 'Aruba', 'AWG', 'ƒ'),
('AU', 'Australia', 'AUD', '$'),
('AT', 'Austria', 'EUR', '€'),
('BS', 'Bahamas', 'BSD', '$'),
('BE', 'Belgium', 'EUR', '€'),
('BR', 'Brazil', 'BRL', 'R$'),
('KH', 'Cambodia', 'KHR', '៛'),
('CA', 'Canada', 'CAD', '$'),
('CN', 'China', 'CNY', '¥'),
('CO', 'Colombia', 'COP', '$'),
('CR', 'Costa Rica', 'CRC', '₡'),
('HR', 'Croatia', 'EUR', '€'),
('CZ', 'Czech Republic', 'CZK', 'Kč'),
('DK', 'Denmark', 'DKK', 'kr'),
('DO', 'Dominican Republic', 'DOP', 'RD$'),
('EG', 'Egypt', 'EGP', '£'),
('EE', 'Estonia', 'EUR', '€'),
('FI', 'Finland', 'EUR', '€'),
('FR', 'France', 'EUR', '€'),
('DE', 'Germany', 'EUR', '€'),
('GR', 'Greece', 'EUR', '€'),
('HU', 'Hungary', 'HUF', 'Ft'),
('IS', 'Iceland', 'ISK', 'kr'),
('IN', 'India', 'INR', '₹'),
('ID', 'Indonesia', 'IDR', 'Rp'),
('IE', 'Ireland', 'EUR', '€'),
('IT', 'Italy', 'EUR', '€'),
('JM', 'Jamaica', 'JMD', 'J$'),
('JP', 'Japan', 'JPY', '¥'),
('JO', 'Jordan', 'JOD', 'JD'),
('KE', 'Kenya', 'KES', 'KSh'),
('LV', 'Latvia', 'EUR', '€'),
('LT', 'Lithuania', 'EUR', '€'),
('LU', 'Luxembourg', 'EUR', '€'),
('MY', 'Malaysia', 'MYR', 'RM'),
('MT', 'Malta', 'EUR', '€'),
('MX', 'Mexico', 'MXN', '$'),
('MC', 'Monaco', 'EUR', '€'),
('MA', 'Morocco', 'MAD', 'MAD'),
('NL', 'The Netherlands', 'EUR', '€'),
('NZ', 'New Zealand', 'NZD', '$'),
('NO', 'Norway', 'NOK', 'kr'),
('PE', 'Peru', 'PEN', 'S/.'),
('PL', 'Poland', 'PLN', 'zł'),
('PT', 'Portugal', 'EUR', '€'),
('PR', 'Puerto Rico', 'USD', '$'),
('QA', 'Qatar', 'QAR', 'ر.ق'),
('RO', 'Romania', 'RON', 'lei'),
('RS', 'Serbia', 'RSD', 'дин.'),
('SG', 'Singapore', 'SGD', '$'),
('SK', 'Slovakia', 'EUR', '€'),
('SI', 'Slovenia', 'EUR', '€'),
('ZA', 'South Africa', 'ZAR', 'R'),
('KR', 'South Korea', 'KRW', '₩'),
('ES', 'Spain', 'EUR', '€'),
('SE', 'Sweden', 'SEK', 'kr'),
('CH', 'Switzerland', 'CHF', 'CHF'),
('TW', 'Taiwan', 'TWD', 'NT$'),
('TZ', 'Tanzania', 'TZS', 'TSh'),
('TH', 'Thailand', 'THB', '฿'),
('TR', 'Turkey', 'TRY', '₺'),
('GB', 'United Kingdom', 'GBP', '£'),
('US', 'United States', 'USD', '$');


-- Seed data for cities
INSERT INTO cities (country_code, name) VALUES
('AE', 'Dubai'), ('AE', 'Abu Dhabi'), ('AE', 'Sharjah'),
('FR', 'Paris'), ('FR', 'Nice'), ('FR', 'Lyon'),
('IT', 'Rome'), ('IT', 'Florence'), ('IT', 'Venice'),
('ES', 'Barcelona'), ('ES', 'Madrid'), ('ES', 'Seville'),
('GB', 'London'), ('GB', 'Edinburgh'), ('GB', 'Manchester'),
('US', 'New York'), ('US', 'Los Angeles'), ('US', 'Chicago');


-- Seed placeholder partner user
-- This user is used for excursions imported via CSV that do not have a specified partner.
-- It's created with a known UUID and email to be easily referenced in the application.
DO $$
DECLARE
    placeholder_partner_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
    -- Check if the user already exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = placeholder_partner_id) THEN
        -- Insert into auth.users
        INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, phone, phone_confirmed_at, email_change, email_change_token_new, email_change_token_current, email_change_confirm_status)
        VALUES (
            placeholder_partner_id, 'authenticated', 'authenticated', 'placeholder-partner@roamready.com', '', NOW(), '', NULL, NULL,
            '{"provider":"email","providers":["email"]}',
            '{"role":"partner","full_name":"RoamReady Imports"}',
            NOW(), NOW(), NULL, NULL, '', '', '', 0
        );

        -- Insert into public.user_profiles
        INSERT INTO public.user_profiles (id, email, full_name, role)
        VALUES (placeholder_partner_id, 'placeholder-partner@roamready.com', 'RoamReady Imports', 'partner');
        
        -- Insert into public.partners
        INSERT INTO public.partners (id, company_name, contact_email)
        VALUES (placeholder_partner_id, 'RoamReady Imported Excursions', 'placeholder-partner@roamready.com');
    END IF;
END $$;
