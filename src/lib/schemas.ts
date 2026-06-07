

import {z} from 'zod';

export const createExcursionSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  duration: z.string().min(1, 'Duration is required.'),
  activitytypeid: z.string().min(1, 'A valid excursion type is required.'),
  rating: z.coerce.number().min(0, 'Rating must be between 0 and 5.').max(5, 'Rating must be between 0 and 5.'),
  images: z.union([
      z.array(z.string()),
      z.string()
    ]).optional(),
  operatinghours: z.string().optional().or(z.literal('')),
  whatsincluded: z.string().optional().or(z.literal('')),
  whatsnotincluded: z.string().optional().or(z.literal('')),
  instructions: z.string().optional().or(z.literal('')),
  howtogetthere: z.string().optional().or(z.literal('')),
  additionalinfo: z.string().optional().or(z.literal('')),
  cancellationpolicy: z.string().optional().or(z.literal('')),
}).passthrough();


export const updateExcursionSchema = createExcursionSchema.extend({
  id: z.string().min(1, 'ID is required.'),
});


export const reviewSchema = z.object({
  activityId: z.string().uuid(),
  rating: z.coerce.number().min(1, "Rating is required.").max(5, "Rating cannot exceed 5."),
  comment: z.string().min(10, "Review must be at least 10 characters long.").max(1000, "Review must be 1000 characters or less."),
});


// --- User Management Schemas ---

export const userUpdateSchema = z.object({
    id: z.string().uuid(),
    fullName: z.string().min(2, 'Full name must be at least 2 characters long.'),
    role: z.enum(['admin', 'agent', 'partner', 'customer']),
});

export const userProfileUpdateSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.').or(z.literal('')),
  phone: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  seatPreference: z.enum(['aisle', 'window', 'middle', 'none']).optional(),
  dietaryRestrictions: z.string().optional(),
});

export const partnerProfileSchema = z.object({
    companyName: z.string().min(2, 'Company name is required.'),
    contactEmail: z.string().email('A valid contact email is required.'),
    website: z.string().url('Please enter a valid URL.').or(z.literal('')).optional(),
    iban: z.string().optional(),
});

export const agentProfileSchema = z.object({
    paypalEmail: z.string().email("A valid PayPal email is required to receive payouts.").or(z.literal("")).optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
    facebookUrl: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
    twitterUrl: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
    instagramUrl: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
});

export const inviteUserSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters long.'),
    role: z.enum(['admin', 'agent', 'partner', 'customer'], {
        errorMap: () => ({ message: "Please select a valid role." })
    }),
});
