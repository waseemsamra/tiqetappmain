
CREATE OR REPLACE FUNCTION search_activities_admin(
    p_search_term TEXT,
    p_limit INT,
    p_offset INT
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    city TEXT,
    country TEXT,
    price REAL,
    duration TEXT,
    activitytypeid UUID,
    partner_id UUID,
    rating REAL,
    images TEXT[],
    operatinghours TEXT,
    whatsincluded TEXT[],
    whatsnotincluded TEXT[],
    instructions TEXT,
    howtogetthere TEXT,
    additionalinfo TEXT,
    cancellationpolicy TEXT,
    status TEXT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.name,
        a.description,
        a.city,
        a.country,
        a.price,
        a.duration,
        a.activitytypeid,
        a.partner_id,
        a.rating,
        a.images,
        a.operatinghours,
        a.whatsincluded,
        a.whatsnotincluded,
        a.instructions,
        a.howtogetthere,
        a.additionalinfo,
        a.cancellationpolicy,
        a.status,
        a.created_at
    FROM
        activities a
    WHERE
        p_search_term IS NULL OR
        a.name ILIKE '%' || p_search_term || '%' OR
        a.city ILIKE '%' || p_search_term || '%' OR
        a.country ILIKE '%' || p_search_term || '%';
END;
$$ LANGUAGE plpgsql;
