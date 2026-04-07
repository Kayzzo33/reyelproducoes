import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLES = {
  PROJECTS: 'reyel_projects',
  TEAM_MEMBERS: 'reyel_team_members',
} as const;

export interface GalleryProject {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  drive_link: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  instagram_url: string;
  order_position: number;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image_url: string;
  drive_link: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}
