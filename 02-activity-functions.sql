
-- Drop functions if they exist
DROP FUNCTION IF EXISTS create_activity(text, text, text, text, numeric, text, uuid, numeric, text[]);
DROP FUNCTION IF EXISTS update_activity(uuid, text, text, text, text, numeric, text, uuid, numeric, text[]);
DROP FUNCTION IF EXISTS clone_activity(uuid);

-- Function to create a new activity
CREATE OR REPLACE FUNCTION create_activity(
    p_name text,
    p_city text,
    p_country text,
    p_description text,
    p_price numeric,
    p_duration text,
    p_activitytypeid uuid,
    p_rating numeric,
    p_images text[]
)
RETURNS excursions
LANGUAGE plpgsql
AS $$
DECLARE
    new_activity excursions;
BEGIN
    INSERT INTO excursions (name, city, country, description, price, duration, activitytypeid, rating, images)
    VALUES (p_name, p_city, p_country, p_description, p_price, p_duration, p_activitytypeid, p_rating, p_images)
    RETURNING * INTO new_activity;
    
    RETURN new_activity;
END;
$$;

-- Function to update an existing activity
CREATE OR REPLACE FUNCTION update_activity(
    p_id uuid,
    p_name text,
    p_city text,
    p_country text,
    p_description text,
    p_price numeric,
    p_duration text,
    p_activitytypeid uuid,
    p_rating numeric,
    p_images text[]
)
RETURNS excursions
LANGUAGE plpgsql
AS $$
DECLARE
    updated_activity excursions;
BEGIN
    UPDATE excursions
    SET
        name = p_name,
        city = p_city,
        country = p_country,
        description = p_description,
        price = p_price,
        duration = p_duration,
        activitytypeid = p_activitytypeid,
        rating = p_rating,
        images = p_images,
        updated_at = now()
    WHERE id = p_id
    RETURNING * INTO updated_activity;

    RETURN updated_activity;
END;
$$;

-- Function to clone an activity
CREATE OR REPLACE FUNCTION clone_activity(p_id uuid)
RETURNS excursions
LANGUAGE plpgsql
AS $$
DECLARE
    original_activity record;
    new_activity excursions;
BEGIN
    -- 1. Find the original activity
    SELECT * INTO original_activity FROM excursions WHERE id = p_id;

    -- 2. Check if the activity exists
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Activity with ID % not found', p_id;
    END IF;

    -- 3. Insert a new record with a modified name
    INSERT INTO excursions (
        name,
        city,
        country,
        description,
        price,
        duration,
        activitytypeid,
        rating,
        images,
        operatinghours,
        whatsincluded,
        whatsnotincluded,
        instructions,
        howtogetthere,
        additionalinfo,
        cancellationpolicy
    )
    VALUES (
        original_activity.name || ' (Copy)',
        original_activity.city,
        original_activity.country,
        original_activity.description,
        original_activity.price,
        original_activity.duration,
        original_activity.activitytypeid,
        original_activity.rating,
        original_activity.images,
        original_activity.operatinghours,
        original_activity.whatsincluded,
        original_activity.whatsnotincluded,
        original_activity.instructions,
        original_activity.howtogetthere,
        original_activity.additionalinfo,
        original_activity.cancellationpolicy
    )
    RETURNING * INTO new_activity;

    -- 4. Return the new activity's ID
    RETURN new_activity;
END;
$$;
