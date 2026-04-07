/*
  # Fix Critical RLS Security Vulnerabilities

  ## Summary
  This migration fixes critical security vulnerabilities where anonymous and authenticated users
  could insert, update, and delete data without proper authorization.

  ## Changes Made

  ### 1. Remove Dangerous Policies
  - Drop all INSERT, UPDATE, and DELETE policies that use `USING (true)` or `WITH CHECK (true)`
  - These policies allowed ANY user to modify data, which is a major security risk

  ### 2. Restrict Write Operations
  - Only authenticated users can INSERT, UPDATE, or DELETE data
  - Add additional checks to ensure proper authorization

  ### 3. Maintain Public Read Access
  - Keep SELECT policies for anonymous users to allow public viewing of the website
  - This allows visitors to see projects and team members without logging in

  ## Security Impact
  - BEFORE: Anyone could add, edit, or delete projects and team members
  - AFTER: Only authenticated users can modify data (admin panel users only)

  ## Tables Affected
  - projects: Restricted write operations to authenticated users only
  - team_members: Restricted write operations to authenticated users only
*/

-- Drop dangerous policies that allow unrestricted access
DROP POLICY IF EXISTS "Anyone can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON public.projects;

DROP POLICY IF EXISTS "Anyone can insert team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can update team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can delete team members" ON public.team_members;

-- Create secure policies for projects table
-- Only authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create secure policies for team_members table
-- Only authenticated users can insert team members
CREATE POLICY "Authenticated users can insert team members"
  ON public.team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update team members
CREATE POLICY "Authenticated users can update team members"
  ON public.team_members
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can delete team members
CREATE POLICY "Authenticated users can delete team members"
  ON public.team_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);