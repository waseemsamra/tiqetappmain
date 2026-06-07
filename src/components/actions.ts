
'use server';
/**
 * This file is for shared server actions that can be used across the application.
 * Note: If a server action is only used by a single component, it is better to
 * co-locate it with that component in a local `actions.ts` file.
 */
import { findNearbyExcursions } from '@/ai/flows/find-nearby-excursions-flow';
import type { Excursion } from '@/types';
