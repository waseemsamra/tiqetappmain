-- Insert default groups if they don't exist
INSERT INTO public.groups (id, name, description) VALUES
  (gen_random_uuid(), 'admin', 'System administrators with full access'),
  (gen_random_uuid(), 'management', 'Management team with access to reports and settings'),
  (gen_random_uuid(), 'agents', 'Travel agents who can manage their own bookings and clients'),
  (gen_random_uuid(), 'partners', 'Business partners and affiliate marketers'),
  (gen_random_uuid(), 'staff', 'Customer support and operational staff'),
  (gen_random_uuid(), 'customers', 'Regular customers and end users')
ON CONFLICT (name) DO NOTHING;

-- Update the handle_new_user function to automatically assign new users to the customer group
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, referred_by, created_at)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'referred_by')::uuid,
    new.created_at
  );

  -- Assign new user to the 'customer' group
  INSERT INTO public.user_groups (user_id, group_id)
  SELECT new.id, id
  FROM public.groups
  WHERE name = 'customer'
  ON CONFLICT (user_id, group_id) DO NOTHING;

  RETURN new;
END;
$$;
