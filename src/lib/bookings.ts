

'use server';

import type {Booking} from '@/types';
import {createClient, createSupabaseAdminClient} from '@/lib/supabase/server';
import * as UserService from '@/lib/user-service';

// This file is intended for functions that are not direct server actions,
// but are server-side helpers related to booking logic.
// All direct client-callable actions are in `src/app/actions.ts`.
// Keeping this file to prevent breaking imports, though it is now empty.
