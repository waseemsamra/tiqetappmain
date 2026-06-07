-- Enable the ltree extension for handling hierarchical data
CREATE EXTENSION IF NOT EXISTS ltree;

-- Create the binary_tree table to store the network structure
CREATE TABLE public.binary_tree (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    "position" TEXT CHECK ("position" IN ('left', 'right')),
    path ltree,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on the path column for faster queries
CREATE INDEX binary_tree_path_gist_idx ON public.binary_tree USING GIST (path);
-- Create an index on the parent_id for faster lookups of children
CREATE INDEX binary_tree_parent_id_idx ON public.binary_tree (parent_id);

-- Enable RLS for the new table
ALTER TABLE public.binary_tree ENABLE ROW LEVEL SECURITY;

-- Policies for binary_tree
-- Allow users to see their own position and the positions of their descendants
CREATE POLICY "Allow users to see their own and descendants' positions"
ON public.binary_tree FOR SELECT
USING (
    auth.uid() = user_id OR
    path <@ (SELECT path FROM public.binary_tree WHERE user_id = auth.uid())
);

-- Allow users to see their direct parent
CREATE POLICY "Allow users to see their parent"
ON public.binary_tree FOR SELECT
USING (
    user_id = (SELECT parent_id FROM public.binary_tree WHERE user_id = auth.uid())
);


-- Function to find the next available position in the binary tree
CREATE OR REPLACE FUNCTION find_next_available_position(p_parent_id UUID)
RETURNS TABLE(new_parent_id UUID, new_position TEXT) AS $$
DECLARE
    queue RECORD;
    current_user_id UUID;
    left_child_id UUID;
    right_child_id UUID;
BEGIN
    -- If no parent is specified, we can't place the user
    IF p_parent_id IS NULL THEN
        RETURN;
    END IF;

    -- Start breadth-first search from the specified parent
    FOR queue IN 
        WITH RECURSIVE q AS (
            SELECT p_parent_id AS id, 1 as level
            UNION ALL
            SELECT bt.user_id, q.level + 1
            FROM q
            JOIN public.binary_tree bt ON bt.parent_id = q.id
        )
        SELECT id FROM q ORDER BY level
    LOOP
        current_user_id := queue.id;

        -- Check for available left position
        SELECT user_id INTO left_child_id FROM public.binary_tree WHERE parent_id = current_user_id AND "position" = 'left';
        IF NOT FOUND THEN
            RETURN QUERY SELECT current_user_id, 'left';
            RETURN;
        END IF;

        -- Check for available right position
        SELECT user_id INTO right_child_id FROM public.binary_tree WHERE parent_id = current_user_id AND "position" = 'right';
        IF NOT FOUND THEN
            RETURN QUERY SELECT current_user_id, 'right';
            RETURN;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

