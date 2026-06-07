export type ExcursionVariant = {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description?: string;
  images?: string[];
};

export type ExcursionType = {
  id: string;
  name: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
  currency: string;
  currency_symbol: string;
};

export type City = {
  id: string;
  name: string;
  country_code: string;
};

export type Excursion = {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  price: number | string;
  duration: string;
  activitytypeid: string;
  excursionType: ExcursionType;
  rating?: number;
  images: string[];
  discount?: number;
  operatinghours?: string;
  whatsincluded?: string | string[];
  whatsnotincluded?: string | string[];
  instructions?: string;
  howtogetthere?: string;
  additionalinfo?: string;
  cancellationpolicy?: string;
  status: 'active' | 'inactive' | 'pending_approval' | 'rejected';
  partner_id: string | null;
  reviews: any[];
  reviewsTotal?: number;
  product_ids?: string[];
  variants?: ExcursionVariant[];
};

export type Review = {
  id: string;
  excursion_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  excursion_id: string;
  booking_reference: string;
  date: string;
  status: string;
  total_price: number;
};

export type User = {
  id: string;
  email?: string;
};

export type FormState = {
  success: boolean;
  message: string;
};