import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  category: string;
  client_type_en: string | null;
  client_type_ar: string | null;
  location_en: string | null;
  location_ar: string | null;
  year: number | null;
  description_en: string;
  description_ar: string;
  scope_en: string[];
  scope_ar: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
};
