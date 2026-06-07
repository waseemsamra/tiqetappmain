-- Drop existing objects if they exist to ensure a clean slate
DROP TABLE IF EXISTS public.binary_tree;
DROP FUNCTION IF EXISTS public.find_next_available_position(uuid);
DROP TYPE IF EXISTS public.binary_position;

-- First, create the ENUM type for the position
CREATE TYPE public.binary_position AS ENUM ('left', 'right');

-- Enable the ltree extension for handling hierarchical data
CREATE EXTENSION IF NOT EXISTS ltree;

-- Create the binary_tree table
CREATE TABLE public.binary_tree (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    "position" public.binary_position,
    path ltree,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes for performance
CREATE INDEX binary_tree_path_gist_idx ON public.binary_tree USING GIST (path);
CREATE INDEX binary_tree_parent_id_idx ON public.binary_tree (parent_id);

-- Add RLS policies
ALTER TABLE public.binary_tree ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to view the tree"
ON public.binary_tree
FOR SELECT
TO authenticated
USING (true);

-- Function to find the next available position in the binary tree for a given parent.
-- This is a simplified placement logic that finds the first open spot by level.
CREATE OR REPLACE FUNCTION public.find_next_available_position(p_parent_id uuid)
RETURNS TABLE(new_parent_id uuid, new_position public.binary_position)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Check if the parent is a valid agent
    is_agent boolean;
BEGIN
    -- Ensure the provided parent is an agent
    SELECT (raw_user_meta_data->>'role' = 'agent')
    INTO is_agent
    FROM auth.users
    WHERE id = p_parent_id;

    IF NOT is_agent THEN
        RAISE EXCEPTION 'Provided parent_id % is not an agent.', p_parent_id;
    END IF;

    -- CTE to perform a breadth-first search for an open slot
    RETURN QUERY
    WITH RECURSIVE q AS (
        SELECT p_parent_id AS user_id, 1 as level
        UNION ALL
        SELECT
            c.user_id,
            q.level + 1
        FROM
            q
        JOIN
            public.binary_tree c ON q.user_id = c.parent_id
    )
    SELECT
        nodes.user_id as new_parent_id,
        CASE
            WHEN l.user_id IS NULL THEN 'left'::public.binary_position
            ELSE 'right'::public.binary_position
        END as new_position
    FROM q AS nodes
    LEFT JOIN public.binary_tree l ON nodes.user_id = l.parent_id AND l.position = 'left'
    LEFT JOIN public.binary_tree r ON nodes.user_id = r.parent_id AND r.position = 'right'
    WHERE l.user_id IS NULL OR r.user_id IS NULL
    ORDER BY nodes.level, nodes.user_id
    LIMIT 1;
END;
$$;
