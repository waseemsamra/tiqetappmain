-- Extend user_profiles table with travel and loyalty details
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS passport_number TEXT,
  ADD COLUMN IF NOT EXISTS passport_expiry DATE,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS loyalty_tier TEXT NOT NULL DEFAULT 'silver',
  ADD COLUMN IF NOT EXISTS loyalty_points INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS miles_points INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- Update the handle_new_user function to set default loyalty_tier (though already set by default, we keep for clarity)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, referred_by, created_at, loyalty_tier)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'referred_by')::uuid,
    new.created_at,
    'silver' -- Explicitly set loyalty_tier to silver for new users
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    referred_by = EXCLUDED.referred_by,
    created_at = EXCLUDED.created_at,
    loyalty_tier = EXCLUDED.loyalty_tier;
  RETURN new;
END;
$$;

-- Update existing rows to have default loyalty_tier if NULL (though the column has NOT NULL default, but just in case)
UPDATE public.user_profiles
SET loyalty_tier = 'silver'
WHERE loyalty_tier IS NULL;