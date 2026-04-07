import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing! Please check your .env file or Vercel settings.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const TABLES = {
  PROJECTS: 'reyel_projects',
  VIDEOS: 'reyel_video_reels',
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

export interface GalleryVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url?: string;
  order_position: number;
  created_at: string;
  updated_at: string;
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
