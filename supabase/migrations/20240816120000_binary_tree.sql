-- Enable the ltree extension for handling hierarchical data
create extension if not exists ltree;

-- Create the binary tree table
create table
  public.binary_tree (
    user_id uuid not null,
    parent_id uuid null,
    "position" public.binary_position not null,
    path public.ltree null,
    created_at timestamp with time zone not null default now(),
    constraint binary_tree_pkey primary key (user_id),
    constraint binary_tree_parent_id_fkey foreign key (parent_id) references public.binary_tree (user_id) on delete restrict,
    constraint binary_tree_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  );

-- Create an index for the path for faster queries
create index binary_tree_path_gist_idx on public.binary_tree using gist (path);
create index binary_tree_parent_id_idx on public.binary_tree (parent_id);


-- Function to find the next available position under a given parent
create or replace function find_next_available_position(p_parent_id uuid)
returns table(new_parent_id uuid, new_position public.binary_position)
language plpgsql
as $$
declare
  v_parent_role text;
begin
  -- Ensure the provided parent is an agent
  select raw_user_meta_data->>'role' into v_parent_role from auth.users where id = p_parent_id;

  if v_parent_role is null or v_parent_role != 'agent' then
    raise exception 'Parent user is not an agent or does not exist.';
  end if;

  -- Simple logic: always try to place left, then right under the direct parent.
  -- A more complex "spillover" logic would require a recursive CTE or loop.
  if not exists (select 1 from public.binary_tree where parent_id = p_parent_id and "position" = 'left') then
    return query select p_parent_id, 'left'::public.binary_position;
    return;
  end if;

  if not exists (select 1 from public.binary_tree where parent_id = p_parent_id and "position" = 'right') then
    return query select p_parent_id, 'right'::public.binary_position;
    return;
  end if;

  -- If both positions are taken, this function (in its simple form) returns nothing.
  -- The application layer will need to handle this by traversing the tree.
  -- For now, this is a placeholder for more complex placement logic.
  
end;
$$;
