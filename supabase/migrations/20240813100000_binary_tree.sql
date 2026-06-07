
-- Enable the ltree extension for hierarchical data
create extension if not exists ltree;

-- Define a custom type for the position in the binary tree
create type public.binary_position as enum ('left', 'right');

-- Create the binary_tree table to store the network structure
create table public.binary_tree (
    user_id uuid not null references public.users(id) on delete cascade,
    parent_id uuid references public.users(id) on delete set null,
    "position" public.binary_position,
    path ltree,
    primary key (user_id)
);

-- Create indexes for efficient querying
create index on public.binary_tree using gist (path);
create index on public.binary_tree (parent_id);

-- Add comments to explain the table and columns
comment on table public.binary_tree is 'Stores the hierarchical structure for the binary MLM.';
comment on column public.binary_tree.user_id is 'The user in the tree.';
comment on column public.binary_tree.parent_id is 'The direct sponsor in the binary tree.';
comment on column public.binary_tree."position" is 'The leg (left or right) under the parent.';
comment on column public.binary_tree.path is 'The hierarchical path from the root to this node.';


-- Function to find the next available position under a given parent
create or replace function public.find_next_available_position(p_parent_id uuid)
returns table(new_parent_id uuid, new_position public.binary_position)
language plpgsql
as $$
declare
    -- Check if the intended parent is an agent
    is_agent boolean;
begin
    -- First, verify that the parent is an agent.
    select (raw_user_meta_data->>'role') = 'agent'
    into is_agent
    from auth.users
    where id = p_parent_id;

    if not is_agent then
        -- If the parent is not an agent, we cannot place anyone under them.
        -- We might return null or raise an error. For now, let's return nothing.
        return;
    end if;

    -- If parent is an agent, proceed with finding an open spot.
    return query
    with recursive downline as (
        -- Start with the initial parent
        select p_parent_id as user_id, 0 as level
        union all
        -- Recursively find all children
        select
            bt.user_id,
            d.level + 1
        from
            public.binary_tree bt
        join
            downline d on bt.parent_id = d.user_id
    )
    select
        d.user_id,
        bp.pos
    from
        downline d
    cross join
        (values ('left'::public.binary_position), ('right'::public.binary_position)) as bp(pos)
    where not exists (
        select 1
        from public.binary_tree bt_child
        where bt_child.parent_id = d.user_id and bt_child."position" = bp.pos
    )
    order by
        d.level,
        d.user_id,
        bp.pos
    limit 1;
end;
$$;
