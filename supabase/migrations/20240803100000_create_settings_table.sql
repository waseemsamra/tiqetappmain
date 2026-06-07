
CREATE TABLE public.settings (
    key text PRIMARY KEY NOT NULL,
    value text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access" ON public.settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Seed initial Google Analytics ID if it exists in env vars
-- This is just for convenience during setup. The value can be updated from the UI.
DO $$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_catalog.pg_namespace WHERE nspname = 'pg_variables') THEN
      INSERT INTO public.settings (key, value)
      VALUES ('google_analytics_id', current_setting('app.settings.ga_id', true))
      ON CONFLICT (key) DO NOTHING;
   END IF;
END $$;
