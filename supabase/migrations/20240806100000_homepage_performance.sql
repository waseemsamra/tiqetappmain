
CREATE OR REPLACE FUNCTION get_homepage_excursions()
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
    result json;
BEGIN
    WITH all_active AS (
        SELECT 
            a.*,
            json_build_object('id', at.id, 'name', at.name) as "excursionType"
        FROM 
            activities a
        JOIN 
            activity_types at ON a.activitytypeid = at.id
        WHERE 
            a.status = 'active' AND a.activitytypeid IS NOT NULL
    ),
    top_rated AS (
        SELECT * FROM all_active ORDER BY rating DESC, name LIMIT 20
    ),
    uae AS (
        SELECT * FROM all_active WHERE country ILIKE 'United Arab Emirates' LIMIT 20
    ),
    adventures AS (
        SELECT * FROM all_active WHERE excursionType->>'name' = 'Adventure Sport' LIMIT 10
    ),
    most_popular AS (
        SELECT * FROM all_active ORDER BY random() LIMIT 8
    ),
    hand_picked AS (
        SELECT * FROM all_active ORDER BY random() LIMIT 10
    ),
    top_rated_cities AS (
        SELECT city
        FROM top_rated
        GROUP BY city
        ORDER BY COUNT(*) DESC
        LIMIT 5
    ),
    top_rated_for_tabs AS (
        SELECT * FROM all_active
        WHERE city IN (SELECT city FROM top_rated_cities)
    )
    SELECT json_build_object(
        'top_rated', (SELECT json_agg(t) FROM top_rated t),
        'uae', (SELECT json_agg(u) FROM uae u),
        'adventures', (SELECT json_agg(adv) FROM adventures adv),
        'most_popular', (SELECT json_agg(mp) FROM most_popular mp),
        'hand_picked', (SELECT json_agg(hp) FROM hand_picked hp),
        'top_rated_for_tabs', (SELECT json_agg(trft) FROM top_rated_for_tabs trft)
    )
    INTO result;

    RETURN result;
END;
$$;
